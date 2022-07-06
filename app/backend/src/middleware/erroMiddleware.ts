import { NextFunction, Request, Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ErrorHandler } from '../interfaces';

const erroMiddleware = (err: ErrorHandler, req: Request, res: Response, _next: NextFunction) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  console.log(err.message);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
    { message: ReasonPhrases.INTERNAL_SERVER_ERROR },
  );
};

export default erroMiddleware;
