import { Op } from 'sequelize';
import { IUserModel } from '../interfaces';
import Users from '../database/models/users.model';

export default class UserRepository implements IUserModel {
  constructor(private model = Users) {
    this.model = model;
  }

  async validateLogin(email: string, password: string):Promise<boolean> {
    const validLogin = await this.model.findOne({ where: {
      [Op.and]: [
        { email },
        { password },
      ],
    } });
    if (validLogin === null) {
      return false;
    }
    return true;
  }
}
