const { expect } = require('chai')
const request = require('supertest')

const app = require('../app')




describe('Test for Stateless Microservice with Node.JS', () => {
  let token;
  // Mock user authentication
  describe('Authentication Test', () => {
    it('should log in a user with any username/password combination and return JWT Authorization', (done) => {
      request.agent(app)
        .post('/api/auth/login')
        .send({ username: 'username', password: 'password' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.have.property('Authorization');
          done()
        })
    })

    it('should should not sign in a user if username or password is missing', (done) => {
      request.agent(app)
        .post('/api/auth/login')
        .send({ username: 'username', password: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
          done()
        })
    })
  })


  });