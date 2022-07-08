import { NextFunction, Request, Response } from 'express';
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

      const user = await this.service.validateLogin(email, password);
      if (user) next();

      next(statusMessage(400, 'Email ou senha inválido'));
    } catch (error) {
      next(error);
    }
  };

  generateToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email } = req.body;
      const token = this.service.generateToken(email);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
    }
  };
}
