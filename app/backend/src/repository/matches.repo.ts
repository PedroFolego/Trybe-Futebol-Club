import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { IMatchesRepo, IMatches } from '../interfaces/matches';

export default class MatchesRepository implements IMatchesRepo {
  constructor(private model = Matches) { }

  async getAll() {
    const matches = await this.model.findAll({ include: [
      { model: Teams, as: 'teamHome' },
      { model: Teams, as: 'teamAway' },
    ] }) as unknown;
    return matches as IMatches[];
  }
  // getOne(id: string): Promise<IMatches | null>
}
