import { Router } from 'express';
import Login from '../controllers/login.controller';

const login = Router();

const controller = new Login();

login.get('/', controller);

export default login;
