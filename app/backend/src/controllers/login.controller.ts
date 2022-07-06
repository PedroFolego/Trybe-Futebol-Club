import { NextFunction, Request, Response } from 'express';
import { ILoginService } from '../interfaces';

export default class Login {
  private service;
  constructor(service: ILoginService) {
    this.service = service;
  }

  validateLogin(req: Request, _res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      if (this.service.validateLogin(email, password)) {
        next();
      }
      next('erro');
    } catch (error) {
      next(error);
    }
  }
}
