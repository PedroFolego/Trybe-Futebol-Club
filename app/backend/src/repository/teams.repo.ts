import Teams from '../database/models/teams.model';
import { ITeamsRepo } from '../interfaces/teams';

export default class TeamsRepository implements ITeamsRepo {
  constructor(private model = Teams) {}

  getAll = async () => this.model.findAll();
}
