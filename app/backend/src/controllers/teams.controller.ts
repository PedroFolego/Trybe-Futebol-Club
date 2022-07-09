import { ITeamsService } from '../interfaces/teams';

export default class TeamsController {
  constructor(private service: ITeamsService) { }

  getAll = async () => this.service.getAll();
}
