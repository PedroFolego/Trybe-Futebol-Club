import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/matches.model';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Verifica a rota /matches GET', () => {
  const fakeResponse = [ 
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    }, {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      }
    }
  ] as unknown;
  beforeEach(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(fakeResponse as Matches[])
  })
  afterEach(async () => {
    (Matches.findAll as sinon.SinonStub).restore();
  })
  it('Um status 200 e um array com as partidas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls(fakeResponse);
  });
});
describe('Verifica a rota /matches/:id quando existe uma partida', () => {
  const fakeResponse = {
    id: 1,
    homeTeam: 16,
    homeTeamGoals: 1,
    awayTeam: 8,
    awayTeamGoals: 1,
    inProgress: false,
    teamHome: {
      teamName: "São Paulo"
    },
    teamAway: {
      teamName: "Grêmio"
    }
  };
  beforeEach(() => {
    sinon
      .stub(Matches, 'findOne')
      .resolves(fakeResponse as unknown as Matches)
  })
  afterEach(() => {
    (Matches.findOne as sinon.SinonStub).restore();
  })
  it('Um status 200 e a partida', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches/1');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls(fakeResponse);
  });
});
describe('Verifica a rota /matches/:id quando não existe uma partida', () => {
  beforeEach(() => {
    sinon
      .stub(Matches, 'findOne')
      .resolves(null)
  })
  afterEach(() => {
    (Matches.findOne as sinon.SinonStub).restore();
  })
  it('Um status 404 e uma mensagem not found', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches/9000');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.eqls({
     message: 'Matche not found'
    });
  });
});
describe('Verifica a rota /matches GET com query string', () => {
  const fakeResponse = [ 
    {
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    }, {
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      }
    }
  ] as unknown;
  beforeEach(async () => {
    sinon
      .stub(Matches, 'findAll')
      .resolves(fakeResponse as Matches[])
  })
  afterEach(async () => {
    (Matches.findAll as sinon.SinonStub).restore();
  })
  it('Um status 200 e um array com as partidas em andamento', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls([{
      id: 41,
      homeTeam: 16,
      homeTeamGoals: 2,
      awayTeam: 9,
      awayTeamGoals: 0,
      inProgress: true,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Internacional"
      }
    }]);
  });
  it('Um status 200 e um array com as partidas concluídas', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls([{
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      teamHome: {
        teamName: "São Paulo"
      },
      teamAway: {
        teamName: "Grêmio"
      }
    }]);
  });
});