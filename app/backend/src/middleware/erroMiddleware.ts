import { NextFunction, Request, Response } from 'express';
import { ErrorHandler } from '../interfaces';

const erroMiddleware = (err: ErrorHandler, _req: Request, res: Response, _next: NextFunction) => {
  if (err.status) return res.status(err.status).json({ message: err.message });
  console.log(err.message);
  return res.status(500).json(
    { message: 'Internal Server Error' },
  );
};

export default erroMiddleware;
