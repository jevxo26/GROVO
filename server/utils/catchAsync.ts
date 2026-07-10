import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(requestHandler(req, res, next)).catch((err) =>
      next(err),
    );
  };
};

export default catchAsync;
