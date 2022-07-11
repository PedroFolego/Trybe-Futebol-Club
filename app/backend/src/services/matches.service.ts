import { IMatchesRepo, IMatchesService, ITeams } from '../interfaces/matches';

export default class MatchesService implements IMatchesService {
  #repository: IMatchesRepo;
  constructor(repository: IMatchesRepo) {
    this.#repository = repository;
  }

  async getAll() {
    const matches = await this.#repository.getAll();
    return matches;
  }

  async getOne(id: string) {
    const matche = await this.#repository.getOne(id);
    return matche;
  }

  async getInProgress(progress: boolean) {
    const matches = await this.getAll();
    return matches.filter((matche) => matche.inProgress === progress);
  }

  async createMatche(body: ITeams) {
    const { homeTeam, homeTeamGoals, awayTeam, awayTeamGoals } = body;

    const id = await this.#repository.createMatche({
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
    this.#repository.updateProgressMatch(id);
  }
}
