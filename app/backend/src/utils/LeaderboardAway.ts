import { ILeaderboard } from '../interfaces/leaderboard';
import { IMatche } from '../interfaces/matches';

export default class LeaderboardTeamAway implements ILeaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories:number;
  totalDraws:number;
  totalLosses:number;
  goalsFavor: number;
  goalsOwn:number;
  goalsBalance: number;
  efficiency:number;
  #matches: IMatche[];

  constructor(matches: IMatche[]) {
    this.#matches = matches;
    this.name = this.#matches[0].teamAway.teamName;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
    this.getGames();
    this.getTotalScore();
    this.getGoals();
    this.getEfficiency();
  }

  private getTotalScore() {
    this.#matches.forEach((match) => {
      if (match.awayTeamGoals > match.homeTeamGoals) {
        this.totalPoints += 3;
        this.totalVictories += 1;
      } else if (match.awayTeamGoals === match.homeTeamGoals) {
        this.totalPoints += 1;
        this.totalDraws += 1;
      } else {
        this.totalLosses += 1;
      }
    });
  }

  private getGoals() {
    this.goalsFavor = this.#matches.reduce((acc, match) => match.awayTeamGoals + acc, 0);
    this.goalsOwn = this.#matches.reduce((acc, match) => match.homeTeamGoals + acc, 0);
    this.goalsBalance = this.goalsFavor - this.goalsOwn;
  }

  private getEfficiency() {
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }

  private getGames() {
    this.totalGames = this.#matches.length;
  }
}
