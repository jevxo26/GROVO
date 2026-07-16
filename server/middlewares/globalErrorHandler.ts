import { NextFunction, Request, Response } from "express";

// Define an interface for custom errors that include status codes
interface CustomError extends Error {
  statusCode?: number;
  success?: boolean;
}

const globalErrorHandler = (
  error: CustomError, // Use the custom interface here
  req: Request,
  res: Response,
  next: NextFunction, // Prefixed with underscore to satisfy the linter
) => {
  const isDev = process.env.NODE_ENV === "development";
  const statusCode = error.statusCode || 500;

  res.status(statusCode).json({
    success: error.success ?? false, // Safe fallback for the boolean
    message: error.message,
    ...(isDev && {
      error: error,
      stackTrace: error.stack,
    }),
  });
};

export default globalErrorHandler;
