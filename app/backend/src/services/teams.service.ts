import { ITeamsRepo, ITeamsService } from '../interfaces/teams';

export default class TeamsService implements ITeamsService {
  constructor(private repository: ITeamsRepo) {}

  getAll = async () => this.repository.getAll();
}
