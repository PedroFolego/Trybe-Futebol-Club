import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import MatchesRepository from '../repository/matches.repo';

const matches = Router();

const factory = () => {
  const model = new MatchesRepository();
  const service = new MatchesService(model);
  const controller = new MatchesController(service);

  return controller;
};

matches.get('/', factory().getAll);
// matches.get('/:id', factory().getOne);

export default matches;
