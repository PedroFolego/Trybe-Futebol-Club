import { ITeamsService } from '../interfaces/teams';

export default class TeamsController {
  constructor(private service: ITeamsService) { }

  getAll = () => this.service.getAll();
}
