import { ITeamsRepo, ITeamsService } from '../interfaces/teams';

export default class TeamsService implements ITeamsService {
  constructor(private repository: ITeamsRepo) {}

  getAll = async () => this.repository.getAll();

  getOne = async (id: string) => this.repository.getOne(Number(id));
}
