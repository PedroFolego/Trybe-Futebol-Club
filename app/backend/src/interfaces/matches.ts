export interface IMatchesService {
  getAll(): Promise<IMatches[]>
  getOne(id: string): Promise<IMatches | null>
}

export interface IMatches {
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
  getAll(): Promise<IMatches[]>
  getOne(id: string): Promise<IMatches | null>
}
