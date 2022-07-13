import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import LeaderboardTeamHome from '../utils/LeaderboardHome';
import { ILeaderboardService } from '../interfaces/leaderboard';
import LeaderboardTeamAway from '../utils/LeaderboardAway';

export default class LeaderboardController {
  #service: ILeaderboardService;
  constructor(service: ILeaderboardService) {
    this.#service = service;
  }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.#service.getLeaderboard(LeaderboardTeamHome);
      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };

  getAllHome = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.#service.getLeaderboard(LeaderboardTeamHome, 'home');
      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };

  getAllAway = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.#service.getLeaderboard(LeaderboardTeamAway, 'away');
      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
