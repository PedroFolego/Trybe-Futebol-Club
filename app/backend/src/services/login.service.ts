import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import RepositoryUser from '../repository/users.repo';
import { ILoginService } from '../interfaces/login';

dotenv.config();

export default class LoginService implements ILoginService {
  jwtSecret: jwt.Secret;

  constructor(private repository: RepositoryUser) {
    this.repository = repository;
    this.jwtSecret = process.env.JWT_SECRET || 'myJwtSecret';
  }

  async validateLogin(email: string, password: string):Promise<boolean> {
    const user = await this.repository.validateLogin(email);
    if (user) {
      const valid = bcrypt.compareSync(password, user.password);
      console.log(valid);

      return valid;
    }
    return false;
  }

  generateToken(email:string): string {
    const token = jwt.sign({ data: email }, this.jwtSecret);
    return token;
  }
}
