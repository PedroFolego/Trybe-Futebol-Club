import { IMatchesRepo, IMatchesService } from '../interfaces/matches';

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
}