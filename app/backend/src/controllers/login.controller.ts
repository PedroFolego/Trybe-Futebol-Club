import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import statusMessage from '../utils';
import { ILoginService } from '../interfaces/login';

export default class LoginController {
  public service;
  constructor(service: ILoginService) {
    this.service = service;
  }

  validateLogin = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        next(statusMessage(StatusCodes.UNAUTHORIZED, 'All fields must be filled'));
      }
      const user = await this.service.validateLogin(email, password);
      if (user) next();

      next(statusMessage(StatusCodes.BAD_REQUEST, 'Incorrect email or password'));
    } catch (error) {
      next(error);
    }
  };

  generateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const token = this.service.generateToken(email);
      return res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
