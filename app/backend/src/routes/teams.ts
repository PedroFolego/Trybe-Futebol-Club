import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const teams = Router();

const factory = () => {
  const model = new ();
  const service = new (model);
  const controller = new TeamsController(service);

  return controller;
};

teams.get('/', factory());

export default teams;
