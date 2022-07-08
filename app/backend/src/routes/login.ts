import { Router } from 'express';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';
import UserRepository from '../repository/users.repo';

const login = Router();

const entityFactory = () => {
  const model = new UserRepository();
  const service = new LoginService(model);
  const controller = new LoginController(service);

  return controller;
};

login.post(
  '/',
  entityFactory().validateLogin,
  entityFactory().generateToken,
);

export default login;
