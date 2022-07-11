import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import statusMessage from '../utils/functions';
import { JwtPayloadHandler } from '../interfaces/login';
import UserRepository from '../repository/users.repo';
import LoginService from '../services/login.service';

const tokenValidation = async (req: Request, _res: Response, next:NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error(); // return next(statusMessage(StatusCodes.UNAUTHORIZED, 'Token not found'));
    const serviceLogin = new LoginService(new UserRepository());
    const { data } = serviceLogin.verifyToken(authorization) as JwtPayloadHandler;
    const user = await serviceLogin.findUserByEmail(data.email);
    if (!user) throw new Error();
    next();
  } catch (error) {
    next(statusMessage(StatusCodes.UNAUTHORIZED, 'Token must be a valid token'));
  }
};

export default tokenValidation;
