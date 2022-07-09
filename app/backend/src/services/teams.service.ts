import { ITeamsRepo, ITeamsService } from '../interfaces/teams';

export default class TeamsService implements ITeamsService {
  constructor(private repository: ITeamsRepo) {}

  getAll = () => this.repository.getAll();
}
