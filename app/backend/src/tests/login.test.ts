import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Users from '../database/models/users.model';
import { after, before } from 'mocha';

// import LoginController from '../controllers/login.controller'
// import LoginService from '../services/login.service'
// import UserRepository from '../repository/users.repo'


chai.use(chaiHttp);

const { expect } = chai;
describe('Verifica a rota Login', () => {
  let chaiHttpResponse: Response;

  it('Quando aceita', async () => {

    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves({
          email: 'admin@admin.com',
          password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
        } as Users);
    });

    // after(async ()=>{
    //   (Users.findOne as sinon.SinonStub).restore();
    // });

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
});

  it('Quando recusado', async () => {
    before(async () => {
      sinon
        .stub(Users, "findOne")
        .resolves(null);
    });
  
    // after(()=>{
    //   (Users.findOne as sinon.SinonStub).restore();
    // });

    it('Verifica se retorna um status 400 e uma mensagem quando está sem email', async () => {

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
    });
    it('Verifica se retorna um status 400 e uma mensagem quando está sem password', async () => {
    
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
    it('Verifica se retorna um status 401 e uma mensagem quando o email ou a senha estiver errado', async () => {

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
});
