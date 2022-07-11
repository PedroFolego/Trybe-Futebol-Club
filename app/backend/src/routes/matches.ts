import { Router } from 'express';
import tokenValidation from '../middleware/tokenValidation';
import MatchesController from '../controllers/matches.controller';
import MatchesService from '../services/matches.service';
import MatchesRepository from '../repository/matches.repo';
import TeamsRepository from '../repository/teams.repo';

const matches = Router();

const factory = () => {
  const modelTeam = new TeamsRepository();
  const modelMatch = new MatchesRepository();
  const service = new MatchesService(modelMatch, modelTeam);
  const controller = new MatchesController(service);

  return controller;
};

matches.get('/', factory().getInProgressOrAll);
matches.patch('/:id', factory().updateGoals);
matches.patch('/:id/finish', factory().updateProgressMatch);
matches.get('/:id', factory().getOne);
matches.post('', tokenValidation, factory().createMatche);

export default matches;
