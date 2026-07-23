// server/utils/token.ts
import { Response } from "express";
import { JwtPayload, SignOptions } from "jsonwebtoken";
import { CookieUtils } from "./cookies";
import { jwtUtils } from "./jwt";

// Creating access token
const getAccessToken = (payload: JwtPayload) => {
  const accessToken = jwtUtils.createToken(
    payload,
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m" } as SignOptions,
  );
  return accessToken;
};

const getRefreshToken = (payload: JwtPayload) => {
  const refreshToken = jwtUtils.createToken(
    payload,
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d" } as SignOptions,
  );
  return refreshToken;
};

// Verify access token
const verifyAccessToken = (token: string) => {
  const result = jwtUtils.verifyToken(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
  );
  if (!result.success) {
    throw new Error(result.message || "Invalid or expired access token");
  }
  return result.data;
};

// Verify refresh token
const verifyRefreshToken = (token: string) => {
  const result = jwtUtils.verifyToken(
    token,
    process.env.REFRESH_TOKEN_SECRET as string,
  );
  if (!result.success) {
    throw new Error(result.message || "Invalid or expired refresh token");
  }
  return result.data;
};

const setAccessTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });
};

const setRefreshTokenCookie = (res: Response, token: string) => {
  CookieUtils.setCookie(res, "refresh_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

const setSessionTokenCookie = (res: Response, userId: string) => {
  CookieUtils.setCookie(res, "session_token", userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const tokenUtils = {
  getAccessToken,
  getRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  setAccessTokenCookie,
  setRefreshTokenCookie,
  setSessionTokenCookie,
};
