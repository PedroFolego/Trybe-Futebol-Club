export interface IMatchesService {
  getAll(): Promise<IMatche[]>
  getOne(id: string): Promise<IMatche | null>
  getInProgress(progress: boolean): Promise<IMatche[]>
  createMatche(body: ITeams): Promise<ITeamsId>
  updateProgressMatch(id: number): void
  validateTeams(team: number[]): Promise<boolean>
}

export interface IMatchesRepo {
  getAll(): Promise<IMatche[]>
  getOne(id: string): Promise<IMatche | null>
  createMatche(body: ITeams): Promise<number>
  updateProgressMatch(id: number): void
}

export interface ITeams {
  homeTeam: number
  homeTeamGoals: number
  awayTeam: number
  awayTeamGoals: number
}

export interface IMatche extends ITeams, IIdMatche {
  inProgress: boolean
  teamHome: {
    teamName: string
  },
  teamAway: {
    teamName: string
  }
}

export interface IIdMatche {
  id: number
}

export interface ITeamsId extends IIdMatche, ITeams { }
