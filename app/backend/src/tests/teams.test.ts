import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Teams from '../database/models/teams.model';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Verifica a rota /teams', () => {
  const fakeResponse = [
    {
      id: 1,
      teamName: 'Avaí/Kindermann'
    },
    {
      id: 2,
      teamName: 'Bahia'
    },
    {
      id: 3,
      teamName: 'Botafogo'
    }
  ];
  beforeEach(async () => {
    sinon
      .stub(Teams, 'findAll')
      .resolves(fakeResponse as Teams[])
  })
  afterEach(async () => {
    (Teams.findAll as sinon.SinonStub).restore();
  })
  it('Um status 200 e um array com os times', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls(fakeResponse);
  });
})
describe('Verifica a rota /teams/:id quando existe um time', () => {
  beforeEach(() => {
    sinon
      .stub(Teams, 'findOne')
      .resolves({
        id: 3,
        teamName: 'Botafogo'
      } as Teams)
  })
  afterEach(() => {
    (Teams.findOne as sinon.SinonStub).restore();
  })
  it('Um status 200 e um array com o time', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/3');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls({
      id: 3,
      teamName: 'Botafogo'
    });
  });
});
describe('Verifica a rota /teams/:id quando não existe um time', () => {
  beforeEach(() => {
    sinon
      .stub(Teams, 'findOne')
      .resolves(null)
  })
  afterEach(() => {
    (Teams.findOne as sinon.SinonStub).restore();
  })
  it('Um status 200 e um array com o time', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/teams/3');

    expect(chaiHttpResponse.status).to.be.equal(404);
    expect(chaiHttpResponse.body).to.be.eqls({
     message: 'Team not found'
    });
  });
});