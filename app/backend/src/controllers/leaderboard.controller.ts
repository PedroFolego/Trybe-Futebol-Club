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

  getAllHome = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.#service.orderLeaderboard('home', LeaderboardTeamHome);
      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };

  getAllAway = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.#service.orderLeaderboard('away', LeaderboardTeamAway);
      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
