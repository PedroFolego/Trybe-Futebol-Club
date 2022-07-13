import LeaderboardTeamHome from '../utils/LeaderboardHome';
import LeaderboardTeamAway from '../utils/LeaderboardAway';
import LeaderboardGeneral from '../utils/LeaderboardGeneral';
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
  }

  async getLeaderboard(
    ClassLeaderboard: IConstructorLeaderboard,
    type: 'home' | 'away',
  ) {
    const board: ILeaderboard[] = [];
    const teams = await this.#serviceTeam.getAll();
    const matches = await this.#serviceMatche.getInProgress(false);

    teams.forEach((team) => {
      const matchesTeam = matches
        .filter((match) => {
          const a = (match[`${type}Team`]) === team.id;
          return a;
        });

      board.push(new ClassLeaderboard(matchesTeam));
    });
    return LeaderboardService.orderLeaderboard(board);
  }

  async getLeaderboardGeneral() {
    const home = await this.getLeaderboard(LeaderboardTeamHome, 'home');
    const away = await this.getLeaderboard(LeaderboardTeamAway, 'away');
    const board: ILeaderboard[] = [];

    home.forEach((boardHome) => {
      away.forEach((boardAway) => {
        if (boardHome.name === boardAway.name) {
          board.push(new LeaderboardGeneral([boardHome, boardAway]));
        }
      });
    });

    return LeaderboardService.orderLeaderboard(board);
  }

  static async orderLeaderboard(board: ILeaderboard[]) {
    const sort = board.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);

    return sort;
  }
}
