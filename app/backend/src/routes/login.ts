import { Router } from 'express';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';
import UserRepository from '../repository/users.repo';

const login = Router();

const controller = new LoginController(new LoginService(new UserRepository()));

login.get('/', controller.validateLogin);

export default login;
