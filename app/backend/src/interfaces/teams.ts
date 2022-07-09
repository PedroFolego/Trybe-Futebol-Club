export interface ITeamsService {
  getAll(): ITeams[]
}

export interface ITeams {
  id: number
  teamName: string
}

export interface ITeamsRepo {
  getAll(): ITeams[]
}
