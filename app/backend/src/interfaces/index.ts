export interface ErrorHandler extends Error {
  status: number,
}

export interface User {
  id: number
  email: string
  password: string
  username: string
  role: string
}
