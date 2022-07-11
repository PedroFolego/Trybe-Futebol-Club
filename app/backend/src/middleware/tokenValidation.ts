import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import statusMessage from '../utils/functions';
import { JwtPayloadHandler } from '../interfaces/login';
import UserRepository from '../repository/users.repo';
import LoginService from '../services/login.service';

const tokenValidation = async (req: Request, _res: Response, next:NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return next(statusMessage(StatusCodes.UNAUTHORIZED, 'Token not found'));
  try {
    const serviceLogin = new LoginService(new UserRepository());
    const { data } = serviceLogin.verifyToken(authorization) as JwtPayloadHandler;
    const user = await serviceLogin.findUserByEmail(data.email);
    if (!user) throw new Error();
    next();
  } catch (error) {
    next(statusMessage(StatusCodes.UNAUTHORIZED, 'Expired or invalid token'));
  }
};

export default tokenValidation;
