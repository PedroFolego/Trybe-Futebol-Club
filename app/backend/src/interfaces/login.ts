export interface ILoginService {
  validateLogin(email: string, password: string): Promise<boolean>
}

export interface IUserModel {
  validateLogin(email: string, password: string): Promise<boolean>
}

export interface ITokenValidate {
  token: string
}
