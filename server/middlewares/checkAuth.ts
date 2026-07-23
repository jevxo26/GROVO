// server/middleware/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import status from "http-status";
import { UserStatus } from "../../generated/prisma/enums";
import customError from "../error/customError";
import { prisma } from "../lib/prisma";
import { CookieUtils } from "../utils/cookies";
import { tokenUtils } from "../utils/token";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role: string;
      };
      session?: any;
    }
  }
}

// Refresh tokens function
const refreshTokens = async (
  req: Request,
  res: Response,
  session: any,
  user: any,
) => {
  try {
    // Generate new tokens
    const newAccessToken = tokenUtils.getAccessToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    const newRefreshToken = tokenUtils.getRefreshToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // Update session with new tokens
    await prisma.userSession.update({
      where: { id: session.id },
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      },
    });

    // Set new cookies
    tokenUtils.setAccessTokenCookie(res, newAccessToken);
    tokenUtils.setRefreshTokenCookie(res, newRefreshToken);
    tokenUtils.setSessionTokenCookie(res, user.id);

    // Set headers
    res.setHeader("X-Session-Refreshed", "true");
    res.setHeader(
      "X-Session-Expires-At",
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    );

    console.log("Session refreshed successfully");
    return { newAccessToken, newRefreshToken };
  } catch (error) {
    console.error("Failed to refresh session:", error);
    throw new customError(status.UNAUTHORIZED, "Failed to refresh session");
  }
};

export const checkAuth = (...authRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // 1. Get tokens from cookies
      const accessToken =
        CookieUtils.getCookie(req, "access_token") ||
        CookieUtils.getCookie(req, "accessToken");

      if (!accessToken) {
        throw new customError(
          status.UNAUTHORIZED,
          "Unauthorized! No token provided.",
        );
      }

      // 2. Verify access token
      let verifiedToken: any;
      try {
        verifiedToken = tokenUtils.verifyAccessToken(accessToken);
      } catch (error: any) {
        // If access token is expired, try to refresh
        if (
          error.message?.includes("expired") ||
          error.message?.includes("jwt expired")
        ) {
          // Get refresh token
          const refreshToken =
            CookieUtils.getCookie(req, "refresh_token") ||
            CookieUtils.getCookie(req, "refreshToken");

          if (!refreshToken) {
            throw new customError(
              status.UNAUTHORIZED,
              "Session expired. Please login again.",
            );
          }

          try {
            // Verify refresh token
            const verifiedRefresh = tokenUtils.verifyRefreshToken(refreshToken);

            if (!verifiedRefresh || !verifiedRefresh.id) {
              throw new customError(
                status.UNAUTHORIZED,
                "Invalid refresh token.",
              );
            }

            // Find session with refresh token
            const session = await prisma.userSession.findFirst({
              where: {
                refreshToken: refreshToken,
                status: "ACTIVE",
                expiresAt: {
                  gt: new Date(),
                },
              },
              include: {
                user: true,
              },
            });

            if (!session || !session.user) {
              throw new customError(status.UNAUTHORIZED, "Session not found.");
            }

            // Check user status
            if (
              session.user.status === UserStatus.SUSPENDED ||
              session.user.status === UserStatus.BANNED
            ) {
              throw new customError(
                status.UNAUTHORIZED,
                "Account is blocked or suspended.",
              );
            }

            // Check roles
            if (
              authRoles.length > 0 &&
              !authRoles.includes(session.user.role)
            ) {
              throw new customError(
                status.FORBIDDEN,
                "Insufficient permissions.",
              );
            }

            // Refresh tokens
            await refreshTokens(req, res, session, session.user);

            // Attach user to request
            req.user = {
              userId: session.user.id,
              email: session.user.email,
              role: session.user.role,
            };
            req.session = session;

            return next();
          } catch (refreshError: any) {
            // Clear cookies on refresh failure
            CookieUtils.clearCookie(res, "access_token");
            CookieUtils.clearCookie(res, "accessToken");
            CookieUtils.clearCookie(res, "refresh_token");
            CookieUtils.clearCookie(res, "refreshToken");
            CookieUtils.clearCookie(res, "session_token");
            throw new customError(
              status.UNAUTHORIZED,
              "Session expired. Please login again.",
            );
          }
        }
        throw new customError(status.UNAUTHORIZED, "Invalid access token.");
      }

      // 3. Verify token payload
      if (!verifiedToken || !verifiedToken.id) {
        throw new customError(status.UNAUTHORIZED, "Invalid token payload.");
      }

      // 4. Check if user session exists and is active
      const userSession = await prisma.userSession.findFirst({
        where: {
          accessToken: accessToken,
          status: "ACTIVE",
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      });

      if (!userSession) {
        throw new customError(
          status.UNAUTHORIZED,
          "Session not found or expired.",
        );
      }

      const user = userSession.user;

      // 5. Check user status
      if (!user) {
        throw new customError(status.UNAUTHORIZED, "User not found.");
      }

      if (
        user.status === UserStatus.SUSPENDED ||
        user.status === UserStatus.BANNED
      ) {
        throw new customError(
          status.UNAUTHORIZED,
          "Account is blocked or suspended.",
        );
      }

      // 6. Check if user is verified
      if (!user.isVerified) {
        throw new customError(
          status.FORBIDDEN,
          "Please verify your email first.",
        );
      }

      // 7. Check role-based access
      if (authRoles.length > 0 && !authRoles.includes(user.role)) {
        throw new customError(status.FORBIDDEN, "Insufficient permissions.");
      }

      // 8. Auto-refresh if session is about to expire (< 20% remaining)
      const now = new Date();
      const expiresAt = new Date(userSession.expiresAt);
      const createdAt = new Date(userSession.createdAt);
      const sessionLifeTime = expiresAt.getTime() - createdAt.getTime();
      const timeRemaining = expiresAt.getTime() - now.getTime();
      const percentRemaining = (timeRemaining / sessionLifeTime) * 100;

      if (percentRemaining < 20 && percentRemaining > 0) {
        await refreshTokens(req, res, userSession, user);
      }

      // 9. Attach user to request
      req.user = {
        userId: user.id,
        email: user.email,
        role: user.role,
      };
      req.session = userSession;

      next();
    } catch (error: any) {
      // Clear cookies on auth failure
      if (
        error.statusCode === status.UNAUTHORIZED ||
        error.statusCode === status.FORBIDDEN
      ) {
        CookieUtils.clearCookie(res, "access_token");
        CookieUtils.clearCookie(res, "accessToken");
        CookieUtils.clearCookie(res, "session_token");
        CookieUtils.clearCookie(res, "refresh_token");
        CookieUtils.clearCookie(res, "refreshToken");
      }
      next(error);
    }
  };
};
