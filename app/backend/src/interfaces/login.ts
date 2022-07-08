import { User } from '.';

export interface ILoginService {
  validateLogin(email: string, password: string): Promise<boolean>
  generateToken(email: string): Promise<string>
}

export interface IUserModel {
  getUser(email: string, password: string): Promise<User>
}

export interface ITokenValidate {
  token: string
}
