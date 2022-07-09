export interface ITeamsService {
  getAll(): Promise<ITeams[]>
}

export interface ITeams {
  id: number
  teamName: string
}

export interface ITeamsRepo {
  getAll(): Promise<ITeams[]>
}
