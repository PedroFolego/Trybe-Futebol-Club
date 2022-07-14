import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/matches.model';
import Users from '../database/models/users.model';
import * as jwt from 'jsonwebtoken';

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
describe('Verifica a rota /matches/:id/finish PATCH', () => {
  beforeEach(async () => {
    sinon
      .stub(Matches, 'update')
      .resolves()
  })
  afterEach(async () => {
    (Matches.update as sinon.SinonStub).restore();
  })
  it('Um status 200 e uma mensagem de finalizado', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/23/finish');

    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Finished' });
  });
});
describe('Verifica a rota /matches/:id PATCH', () => {
  beforeEach(() => {
    sinon
      .stub(Matches, 'update')
      .resolves()
  })
  afterEach(() => {
    (Matches.update as sinon.SinonStub).restore();
  })
  it('Um status 200 e uma mensagem de concluído', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/2')
      .send({
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'All done' })
  })
  it('Um status 400 e uma mensagem de corpo faltando', async () => {
    chaiHttpResponse = await chai  
      .request(app)
      .patch('/matches/2')
      .send({
        "homeTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Missing body' })
  })
});
describe('Verifica a rota /matches/:id PATCH', () => {
  const fakeResponse = [
    {
      "name": "Palmeiras",
      "totalPoints": 13,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 1,
      "totalLosses": 0,
      "goalsFavor": 17,
      "goalsOwn": 5,
      "goalsBalance": 12,
      "efficiency": 86.67
    },
    {
      "name": "Corinthians",
      "totalPoints": 12,
      "totalGames": 5,
      "totalVictories": 4,
      "totalDraws": 0,
      "totalLosses": 1,
      "goalsFavor": 12,
      "goalsOwn": 3,
      "goalsBalance": 9,
      "efficiency": 80
    },
    {
      "name": "Santos",
      "totalPoints": 11,
      "totalGames": 5,
      "totalVictories": 3,
      "totalDraws": 2,
      "totalLosses": 0,
      "goalsFavor": 12,
      "goalsOwn": 6,
      "goalsBalance": 6,
      "efficiency": 73.33
    },
  ]
  beforeEach(() => {
    sinon
      .stub(Matches, 'update')
      .resolves()
  })
  afterEach(() => {
    (Matches.update as sinon.SinonStub).restore();
  })
  it('Um status 200 e uma mensagem de concluído', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .patch('/matches/2')
      .send({
        "homeTeamGoals": 2,
        "awayTeamGoals": 2
      })
    expect(chaiHttpResponse.status).to.be.equal(200)
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'All done' })
  })
  it('Um status 400 e uma mensagem de corpo faltando', async () => {
    chaiHttpResponse = await chai  
      .request(app)
      .patch('/matches/2')
      .send({
        "homeTeamGoals": 2,
      })
    expect(chaiHttpResponse.status).to.be.equal(400)
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Missing body' })
  })
})
// describe('Verifica a rota /matches POST', () => {
//   const fakeResponse = [ 
//     {
//       id: 1,
//       homeTeam: 16,
//       homeTeamGoals: 1,
//       awayTeam: 8,
//       awayTeamGoals: 1,
//       inProgress: false,
//       teamHome: {
//         teamName: "São Paulo"
//       },
//       teamAway: {
//         teamName: "Grêmio"
//       }
//     }, {
//       id: 41,
//       homeTeam: 16,
//       homeTeamGoals: 2,
//       awayTeam: 9,
//       awayTeamGoals: 0,
//       inProgress: true,
//       teamHome: {
//         teamName: "São Paulo"
//       },
//       teamAway: {
//         teamName: "Internacional"
//       }
//     }
//   ] as unknown;
//   beforeEach(async () => {
//     sinon
//       .stub(Matches, 'create')
//       .resolves(fakeResponse as Matches)
//     sinon.stub(Users, 'findOne')
//       .resolves({
//         email: 'admin@admin.com',
//         password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
//       } as Users)
//     sinon.stub(jwt, 'verify')
//       .resolves()
//   })
//   afterEach(async () => {
//     (Matches.create as sinon.SinonStub).restore();
//     (Users.findOne as sinon.SinonStub).restore();
//   })
//   it('Um status 201 e um objeto com a partida criada', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .post('/matches')
//       .send({
//         homeTeam: 16,
//         homeTeamGoals: 2,
//         awayTeam: 9,
//         awayTeamGoals: 0,
//       });

//     expect(chaiHttpResponse.status).to.be.equal(201);
//     expect(chaiHttpResponse.body).to.be.eqls({
//       id: 41,
//       homeTeam: 16,
//       homeTeamGoals: 2,
//       awayTeam: 9,
//       awayTeamGoals: 0,
//       inProgress: true,
//     });
//   });
// });
describe('Verifica a rota /matches POST quando envia autorizações inválidas', () => {
  beforeEach(async () => {
    sinon.stub(jwt, 'verify')
      .resolves()
  })
  afterEach(async () => {
    (jwt.verify as sinon.SinonStub).restore();
  })
  it('Um status 401 e um mensagem de token inválido quando enviado sem um token', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Token must be a valid token'});
  });
  it('Um status 401 e um mensagem de token inválido quando enviado um token inválido', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'tokenInvalido');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Token must be a valid token'});
  });
});
describe('Verifica a rota /matches POST quando envia o usuário inválido', () => {
  beforeEach(async () => {
    sinon.stub(Users, 'findOne')
      .resolves(null)
    sinon.stub(jwt, 'verify')
      .resolves({ data: { role: 'admin', email: 'emailNaoExiste' } })
  })
  afterEach(async () => {
    (Users.findOne as sinon.SinonStub).restore();
    (jwt.verify as sinon.SinonStub).restore();
  })
  it('Um status 401 e um mensagem de token inválido quando o usuário não existe', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'tokenValido');

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.be.eqls({ message: 'Token must be a valid token'});
  });
});
// describe('Verifica a rota /matches POST quando a requisição é inválida', () => {
//   beforeEach(async () => {
//     // sinon.stub(Matches, 'findByPk')
//     //   .resolves(null)
//     sinon.stub(Users, 'findOne')
//       .resolves({
//         email: 'email@valido.com',
//         password: 'password',
//       } as Users);
//     sinon.stub(jwt, 'verify')
//       .resolves({ data: { role: 'admin', email: 'email@valido.com' } })
//   })
//   afterEach(async () => {
//     (Users.findOne as sinon.SinonStub).restore();
//     (jwt.verify as sinon.SinonStub).restore();
//     // (Matches.findByPk as sinon.SinonStub).restore();
//   })
//   it('Um status 401 e um mensagem de times iguais', async () => {
//     chaiHttpResponse = await chai
//       .request(app)
//       .post('/matches')
//       .set('authorization', 'tokenValido')
//       .send({ homeTeam: 3, awayTeam: 3 });
//     // console.log(jwt.verify('dsdsd', ''));
    

//     expect(chaiHttpResponse.status).to.be.equal(401);
//     expect(chaiHttpResponse.body).to.be.eqls({ message: 'It is not possible to create a match with two equal teams'});
//   });
// });