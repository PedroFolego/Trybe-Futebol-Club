import { ITeamsService } from '../interfaces/teams';
import { IMatchesService } from '../interfaces/matches';
import LeaderboardTeam from '../utils/Leaderboard';
import { ILeaderboard, ILeaderboardService } from '../interfaces/leaderboard';

export default class LeaderboardService implements ILeaderboardService {
  #serviceMatche: IMatchesService;
  #serviceTeam: ITeamsService;
  leaderboard: ILeaderboard[];

  constructor(serviceMatche: IMatchesService, serviceTeam: ITeamsService) {
    this.#serviceMatche = serviceMatche;
    this.#serviceTeam = serviceTeam;
    this.leaderboard = [];
  }

  private async getLeaderboard() {
    const teams = await this.#serviceTeam.getAll();
    const matches = await this.#serviceMatche.getInProgress(false);

    teams.forEach((team) => {
      const matchesTeam = matches
        .filter((match) => {
          const a = match.homeTeam === team.id;
          return a;
        });

      this.leaderboard.push(new LeaderboardTeam(matchesTeam));
    });
  }

  async orderLeaderboard() {
    await this.getLeaderboard();

    const sort = this.leaderboard.sort((a, b) => a.totalPoints - b.totalPoints);
    return sort;
  }
}
