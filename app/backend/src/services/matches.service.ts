import { ITeamsRepo } from '../interfaces/teams';
import { IMatchesRepo, IMatchesService, ITeams } from '../interfaces/matches';

export default class MatchesService implements IMatchesService {
  #repoMatche: IMatchesRepo;
  #repoTeam: ITeamsRepo;
  constructor(repoMatche: IMatchesRepo, repoTeam: ITeamsRepo) {
    this.#repoMatche = repoMatche;
    this.#repoTeam = repoTeam;
  }

  async getAll() {
    const matches = await this.#repoMatche.getAll();
    return matches;
  }

  async getOne(id: string) {
    const matche = await this.#repoMatche.getOne(id);
    return matche;
  }

  async getInProgress(progress: boolean) {
    const matches = await this.getAll();
    return matches.filter((matche) => matche.inProgress === progress);
  }

  async createMatche(body: ITeams) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = body;

    const id = await this.#repoMatche.createMatche({
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
    });

    const matche = {
      id,
      inProgress: true,
      ...body,
    };
    return matche;
  }

  async updateProgressMatch(id: number) {
    this.#repoMatche.updateProgressMatch(id);
  }

  async validateTeams(idTeams: number[]) {
    const valid = idTeams
      .every(async (id) => this.#repoTeam.getOne(id));
    return valid;
  }
}
