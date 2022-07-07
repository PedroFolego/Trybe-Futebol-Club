import { User } from '.';

export interface ILoginService {
  validateLogin(email: string, password: string): Promise<boolean>
  generateToken(email: string): string
}

export interface IUserModel {
  validateLogin(email: string, password: string): Promise<User>
}

export interface ITokenValidate {
  token: string
}
