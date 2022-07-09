export interface ITeamsService {
  getAll(): Promise<ITeam[]>
  getOne(id: string): Promise<ITeam | null>
}

export interface ITeam {
  id: number
  teamName: string
}

export interface ITeamsRepo {
  getAll(): Promise<ITeam[]>
  getOne(id: string): Promise<ITeam | null>
}
