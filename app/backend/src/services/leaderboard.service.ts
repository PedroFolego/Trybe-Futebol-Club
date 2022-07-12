import { ITeamsService } from '../interfaces/teams';
import { IMatchesService } from '../interfaces/matches';
import LeaderboardTeam from '../utils/Leaderboard';

export default class LeaderboardService {
  #serviceMatche: IMatchesService;
  #serviceTeam: ITeamsService;
  constructor(serviceMatche: IMatchesService, serviceTeam: ITeamsService) {
    this.#serviceMatche = serviceMatche;
    this.#serviceTeam = serviceTeam;
  }

  async getLeaderboard() {
    const teams = await this.#serviceTeam.getAll();
    const matches = await this.#serviceMatche.getInProgress(false);
    let leaderboard;
    teams.forEach((team) => {
      const matchesTeam = matches
        .filter((match) => match.homeTeam === team.id);
      leaderboard.push(new LeaderboardTeam(matchesTeam));
    });
  }
}
