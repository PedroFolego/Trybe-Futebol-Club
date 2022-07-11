import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import statusMessage from '../utils/functions';
import { ILoginService, JwtPayloadHandler } from '../interfaces/login';

export default class LoginController {
  public service;
  constructor(service: ILoginService) {
    this.service = service;
  }

  validateLogin = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(statusMessage(StatusCodes.BAD_REQUEST, 'All fields must be filled'));
      }
      const user = await this.service.validateLogin(email, password);
      if (user) return next();

      return next(statusMessage(StatusCodes.UNAUTHORIZED, 'Incorrect email or password'));
    } catch (error) {
      return next(error);
    }
  };

  generateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const token = await this.service.generateToken(email);
      return res.status(StatusCodes.OK).json({ token });
    } catch (error) {
      next(error);
    }
  };

  getRoleUser = (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;
      const { data: { role } } = this.service.verifyToken(token) as JwtPayloadHandler;
      return res.status(StatusCodes.OK).json({ role });
    } catch (error) {
      next(error);
    }
  };
}
