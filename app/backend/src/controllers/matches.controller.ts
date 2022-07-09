import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import statusMessage from '../utils/functions';
import { IMatchesService } from '../interfaces/matches';

export default class MatchesController {
  constructor(private service: IMatchesService) { }

  getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const matches = await this.service.getAll();
      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };

  // getOne = async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const { id } = req.params;
  //     const team = await this.service.getOne(id);
  //     if (!team) return next(statusMessage(StatusCodes.NOT_FOUND, 'Team not found'));
  //     return res.status(StatusCodes.OK).json(team);
  //   } catch (error) {
  //     next(error);
  //   }
  // };
}
