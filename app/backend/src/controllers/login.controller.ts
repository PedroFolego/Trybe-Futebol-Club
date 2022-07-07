import { NextFunction, Request, Response } from 'express';
import { ILoginService } from '../interfaces/login';

export default class LoginController {
  private service;
  constructor(service: ILoginService) {
    this.service = service;
  }

  async validateLogin(req: Request, _res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (await this.service.validateLogin(email, password)) {
        next();
      }
      next('erro');
    } catch (error) {
      next(error);
    }
  }
}
