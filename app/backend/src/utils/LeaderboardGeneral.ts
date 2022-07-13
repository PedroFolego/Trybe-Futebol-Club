import { ILeaderboard } from '../interfaces/leaderboard';

export default class LeaderboardGeneral implements ILeaderboard {
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
  #boards: ILeaderboard[];

  constructor(boards: ILeaderboard[]) {
    this.#boards = boards;
    this.name = this.#boards[0].name;
    this.totalPoints = 0;
    this.totalGames = 0;
    this.totalVictories = 0;
    this.totalDraws = 0;
    this.totalLosses = 0;
    this.goalsFavor = 0;
    this.goalsOwn = 0;
    this.goalsBalance = 0;
    this.efficiency = 0;
    this.sumBoards();
    this.getEfficiency();
  }

  private sumBoards() {
    this.#boards.forEach((board) => {
      this.totalPoints += board.totalPoints;
      this.totalGames += board.totalGames;
      this.totalVictories += board.totalVictories;
      this.totalDraws += board.totalDraws;
      this.totalLosses += board.totalLosses;
      this.goalsFavor += board.goalsFavor;
      this.goalsOwn += board.goalsOwn;
      this.goalsBalance += board.goalsBalance;
    });
  }

  private getEfficiency() {
    this.efficiency = parseFloat(((this.totalPoints / (this.totalGames * 3)) * 100).toFixed(2));
  }
}
