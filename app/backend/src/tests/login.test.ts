import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Users from '../database/models/users.model';

chai.use(chaiHttp);

const { expect } = chai;
let chaiHttpResponse: Response;

describe('Verifica a rota /login', () => {
  beforeEach(async () => {
    sinon
      .stub(Users, 'findOne')
      .resolves({
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as Users);
  });
  
  afterEach(async ()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });
  
  it('Se retorna um status 200 e um token quando é feito uma requisição válida', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin'
      });
      
      expect(chaiHttpResponse.status).to.be.equals(200);
      expect(chaiHttpResponse.body).to.have.property('token');
  });
  it('Se retorna um status 400 e uma mensagem quando um dos campos não existe', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'password'
      })

    expect(chaiHttpResponse.status).to.be.equals(400);
    expect(chaiHttpResponse.body).to.be.eqls({
      message: 'All fields must be filled'
    });

    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'email@email.com'
    })

    expect(chaiHttpResponse.status).to.be.equals(400);
    expect(chaiHttpResponse.body).to.be.eqls({
      message: 'All fields must be filled'
    });
  });
  it('Se retorna um status 401 e uma mensagem quando o email ou a senha estiver errado', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'email@invalido.com',
      password: 'passwordErrado'
    })
    
    expect(chaiHttpResponse.status).to.be.equals(401);
    expect(chaiHttpResponse.body).to.be.eqls({
      message: 'Incorrect email or password'
    });
  });
});

describe('Verifica a rota /login/validation', () => {
  beforeEach(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        email: 'admin@admin.com',
        role: 'admin',
      } as Users);
  });
  afterEach(async ()=>{
    (Users.findOne as sinon.SinonStub).restore();
  });
  it('Quando o token é de um admin', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .get('/login/validate')
      .set({
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTY1NzMwNTgwNH0.Y2zCKgBE3PvKUdRNjbIKBpoxREcsYgWcJ_hiXez_8P8'
      });

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.eqls({ role: 'admin' });
  })
})