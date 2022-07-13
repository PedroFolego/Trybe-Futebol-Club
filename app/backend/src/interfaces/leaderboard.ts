import { IMatche } from './matches';

export interface ILeaderboard {
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
}

export interface IConstructorLeaderboard {
  new(leaderboard: IMatche[]): ILeaderboard
}

export interface ILeaderboardService {
  // orderLeaderboard(
  //   type: 'home' | 'away', ClassLeaderboard: IConstructorLeaderboard
  // ): Promise<ILeaderboard[]>
  getLeaderboard(
    ClassLeaderboard: IConstructorLeaderboard, type?: 'home' | 'away'
  ): Promise<ILeaderboard[]>
}
