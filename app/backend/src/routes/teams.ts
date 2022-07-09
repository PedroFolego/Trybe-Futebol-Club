import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';
import TeamsService from '../services/teams.service';
import TeamsRepository from '../repository/teams.repo';

const teams = Router();

const factory = () => {
  const model = new TeamsRepository();
  const service = new TeamsService(model);
  const controller = new TeamsController(service);

  return controller;
};

teams.get('/', factory().getAll);

export default teams;
