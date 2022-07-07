import RepositoryUser from '../repository/users.repo';
import { ILoginService } from '../interfaces/login';

export default class LoginService implements ILoginService {
  constructor(private repository: RepositoryUser) {
    this.repository = repository;
  }

  async validateLogin(email: string, password: string):Promise<boolean> {
    const valid = this.repository.validateLogin(email, password);
    return valid;
  }
}
