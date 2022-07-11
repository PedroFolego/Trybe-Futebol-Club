export interface IMatchesService {
  getAll(): Promise<IMatche[]>
  getOne(id: string): Promise<IMatche | null>
  getInProgress(progress: boolean): Promise<IMatche[]>
}

export interface IMatche {
  id: number
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number
  awayTeamGoals: number
  inProgress: boolean
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface IMatchesRepo {
  getAll(): Promise<IMatche[]>
  getOne(id: string): Promise<IMatche | null>
}
