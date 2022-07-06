export interface ErrorHandler extends Error {
  status: number,
}

export interface ILoginService {
  validateLogin(email: string, password: string): boolean
}

export interface ILoginModel {
  validateLogin(email: string, password: string): boolean
}
