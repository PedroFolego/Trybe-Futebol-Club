import { JwtPayload } from 'jsonwebtoken';
import { User } from '.';

export interface ILoginService {
  validateLogin(email: string, password: string): Promise<boolean>
  generateToken(email: string): Promise<string>
  getRole(token: string): string | JwtPayload
}

export interface IUserModel {
  getUser(email: string, password: string): Promise<User>
}

export interface ITokenValidate {
  token: string
}

export interface JwtPayloadHandler extends JwtPayload {
  data: { role: string }
}
