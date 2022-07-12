import { ITeamsService } from '../interfaces/teams';
import { IMatchesService } from '../interfaces/matches';
import {
  IConstructorLeaderboard, ILeaderboard, ILeaderboardService } from '../interfaces/leaderboard';

export default class LeaderboardService implements ILeaderboardService {
  #serviceMatche: IMatchesService;
  #serviceTeam: ITeamsService;
  leaderboard: ILeaderboard[];

  constructor(serviceMatche: IMatchesService, serviceTeam: ITeamsService) {
    this.#serviceMatche = serviceMatche;
    this.#serviceTeam = serviceTeam;
    this.leaderboard = [];
  }

  private async getLeaderboard(type: 'home' | 'away', ClassLeaderboard: IConstructorLeaderboard) {
    const teams = await this.#serviceTeam.getAll();
    const matches = await this.#serviceMatche.getInProgress(false);

    teams.forEach((team) => {
      const matchesTeam = matches
        .filter((match) => {
          const a = (match[`${type}Team`]) === team.id;
          return a;
        });

      this.leaderboard.push(new ClassLeaderboard(matchesTeam));
    });
  }

  async orderLeaderboard(type: 'home' | 'away', ClassLeaderboard: IConstructorLeaderboard) {
    await this.getLeaderboard(type, ClassLeaderboard);

    const sort = this.leaderboard.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    return sort;
  }
}
