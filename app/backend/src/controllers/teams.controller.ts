import { NextFunction, Request, Response } from 'express';
import { ITeamsService } from '../interfaces/teams';

export default class TeamsController {
  constructor(private service: ITeamsService) { }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      next(error);
    }
  };
}
