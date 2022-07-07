import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import Users from '../database/models/users.model';
import { ITokenValidate } from '../interfaces/login';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verifica a rota Login', () => {
  let chaiHttpResponse: Response;

  it('Se retorna um status 200 e um token quando é feito uma requisição válida', async () => {

  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        email: 'email@email.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      } as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'email@email.com',
        password: 'password'
      })

    expect(chaiHttpResponse.status).to.be.equals(200);
    expect(chaiHttpResponse.body).to.be.eqls({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc'
    });
  });

  it('Se retorna um status 400 quando é feito uma requisição inválida', async () => {
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);
    });
  
    after(()=>{
      (Users.findOne as sinon.SinonStub).restore();
    })
  
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'email@email.com',
        password: 'password'
      })

    expect(chaiHttpResponse.status).to.be.equals(400);
    expect(chaiHttpResponse.body).to.be.eqls({
      message: 'Email ou senha inválido'
    });
  });
});
