import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';
import TeamsRepository from '../repository/teams.repo';
import MatchesRepository from '../repository/matches.repo';
import MatchesService from '../services/matches.service';
import TeamsService from '../services/teams.service';
import LeaderboardService from '../services/leaderboard.service';

const leaderboard = Router();

const factory = () => {
  const modelMatch = new MatchesRepository();
  const modelTeam = new TeamsRepository();

  const serviceMatch = new MatchesService(modelMatch, modelTeam);
  const serviceTeam = new TeamsService(modelTeam);
  const serviceLeaderboard = new LeaderboardService(serviceMatch, serviceTeam);

  const controller = new LeaderboardController(serviceLeaderboard);
  return controller;
};

leaderboard.get('/home', factory().getAllHome);
leaderboard.get('/away', factory().getAllAway);

export default leaderboard;
