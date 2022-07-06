import { Model } from 'sequelize';
import { ILoginService } from '../interfaces';

export default class LoginSerivce implements ILoginService {
  constructor(private model: Model) {
    this.model = model;
  }

  validateLogin(email: string, password: string) {
    const valid = this.model.findOne(email, password);
    return valid;
  }
}
