import { NextFunction, Request, Response } from "express";
import status from "http-status";
import customError from "../error/customError";
import { auth } from "../lib/auth";

const authMiddleware = (role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.headers as any,
      });

      if (!session) {
        throw new customError(
          status.NOT_FOUND,
          "Unauthorized user. Please log in first",
        );
      }

      req.user = {};

      if (!role.includes(session?.user?.role as string)) {
        throw new customError(status.FORBIDDEN, "Unauthorized access");
      }

      next();
    } catch (error) {
      throw new customError(status.FORBIDDEN, "Unauthorized access");
    }
  };
};

export default authMiddleware;
