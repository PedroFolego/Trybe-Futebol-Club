import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ILeaderboardService } from '../interfaces/leaderboard';

export default class LeaderboardController {
  #service: ILeaderboardService;
  constructor(service: ILeaderboardService) {
    this.#service = service;
  }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaderboard = await this.#service.orderLeaderboard();
      return res.status(StatusCodes.OK).json(leaderboard);
    } catch (error) {
      next(error);
    }
  };
}
