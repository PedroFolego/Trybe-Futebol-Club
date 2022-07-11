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

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const matches = await this.service.getOne(id);
      if (!matches) return next(statusMessage(StatusCodes.NOT_FOUND, 'Matche not found'));
      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };

  getInProgress = async (req: Request, res: Response, next: NextFunction) => {
  };
}