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

  async createMatche(body: ITeams) {
    const { homeTeam, awayTeam, awayTeamGoals, homeTeamGoals } = body;
    const matche = await this.model.create({
      homeTeam, awayTeam, awayTeamGoals, homeTeamGoals, inProgress: true,
    });
    return matche.id;
  }

  async updateProgressMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });
  }
}
