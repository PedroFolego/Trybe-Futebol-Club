export interface ErrorHandler extends Error {
  status: number,
}

export interface ILoginService {
  validateLogin(email: string, password: string): Promise<boolean>
}

export interface IUserModel {
  validateLogin(email: string, password: string): Promise<boolean>
}
