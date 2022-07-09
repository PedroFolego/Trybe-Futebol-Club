import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import statusMessage from '../utils/functions';
import { ITeamsService } from '../interfaces/teams';

export default class TeamsController {
  constructor(private service: ITeamsService) { }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const teams = await this.service.getAll();
      return res.status(StatusCodes.OK).json(teams);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const team = await this.service.getOne(id);
      if (!team) return next(statusMessage(StatusCodes.NOT_FOUND, 'Team not found'));
      return res.status(StatusCodes.OK).json(team);
    } catch (error) {
      next(error);
    }
  };
}
