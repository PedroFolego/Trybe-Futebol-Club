import Teams from '../database/models/teams.model';
import Matches from '../database/models/matches.model';
import { IMatchesRepo, IMatche, ITeams } from '../interfaces/matches';

export default class MatchesRepository implements IMatchesRepo {
  constructor(private model = Matches) { }

  async getAll() {
    const matches = await this.model.findAll({ include: [
      { model: Teams, as: 'teamHome' },
      { model: Teams, as: 'teamAway' },
    ] }) as unknown;
    return matches as IMatche[];
  }

  async getOne(id: string) {
    const matche = await this.model.findByPk(Number(id), { include: [
      { model: Teams, as: 'teamHome' },
      { model: Teams, as: 'teamAway' },
    ] }) as unknown;
    return matche as IMatche;
  }

  async createMatche(body: ITeams): Promise<number> {
    const { homeTeam, awayTeam, awayTeamGoals, homeTeamGoals } = body;
    const matche = await this.model.create({ homeTeam, awayTeam, awayTeamGoals, homeTeamGoals });
    return matche.id;
  }
}
