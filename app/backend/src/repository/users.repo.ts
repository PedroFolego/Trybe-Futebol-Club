import { User } from '../interfaces';
import { IUserModel } from '../interfaces/login';
import Users from '../database/models/users.model';

export default class UserRepository implements IUserModel {
  constructor(private model = Users) { }

  async getUser(email: string): Promise<User> {
    const validLogin = await this.model.findOne({ where: { email } });

    return validLogin as User;
  }
}
