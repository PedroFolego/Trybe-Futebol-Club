import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import statusMessage from '../utils/functions';
import { IMatchesService } from '../interfaces/matches';

export default class MatchesController {
  constructor(private service: IMatchesService) { }

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

  getInProgressOrAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { inProgress } = req.query;

      if (!inProgress) {
        const allMatches = await this.service.getAll();
        return res.status(StatusCodes.OK).json(allMatches);
      }
      const progress = inProgress === 'true';
      const matches = await this.service.getInProgress(progress);
      return res.status(StatusCodes.OK).json(matches);
    } catch (error) {
      next(error);
    }
  };

  createMatche = async (req:Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const matche = await this.service.createMatche(body);
      return res.status(StatusCodes.CREATED).json(matche);
    } catch (error) {
      next(error);
    }
  };

  updateProgressMatch = async (req:Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      this.service.updateProgressMatch(Number(id));
      return res.status(StatusCodes.OK).json({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  };
}
