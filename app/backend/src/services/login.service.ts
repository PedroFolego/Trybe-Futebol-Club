import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import RepositoryUser from '../repository/users.repo';
import { ILoginService } from '../interfaces/login';

dotenv.config();

export default class LoginService implements ILoginService {
  private jwtSecret: jwt.Secret;

  constructor(private repository: RepositoryUser) {
    this.repository = repository;
    this.jwtSecret = process.env.JWT_SECRET || 'myJwtSecret';
  }

  async validateLogin(email: string, password: string):Promise<boolean> {
    const user = await this.repository.getUser(email);
    if (user) {
      const valid = bcrypt.compareSync(password, user.password);
      return valid;
    }
    return false;
  }

  async generateToken(email:string): Promise<string> {
    const user = await this.repository.getUser(email);
    const token = jwt.sign({ data: { email, role: user.role } }, this.jwtSecret);

    return token;
  }

  verifyToken(token: string) {
    const user = jwt.verify(token, this.jwtSecret);
    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.repository.getUser(email);
    return user;
  }
}
