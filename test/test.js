const { expect } = require('chai')
const request = require('supertest')

const app = require('../app')



const imageLink = 'https://images-na.ssl-images-amazon.com/images/I/41u-ekL7%2B3L.jpg'


describe('Test for Stateless Microservice with Node.JS', () => {
  let Authorization;
  // Mock user authentication
  describe('Authentication Test', () => {
    it('should login a user with any username/password combination and return JWT Authorization', (done) => {
      request.agent(app)
        .post('/api/auth/login')
        .send({ username: 'username', password: 'password' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.have.property('Authorization');
          Authorization = res.body.Authorization;
          done()
        })
    })

    it('should not login a user if username or password is missing', (done) => {
      request.agent(app)
        .post('/api/auth/login')
        .send({ username: 'username', password: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(401)
          done()
        })
    })
  })






  describe('Thumbnail creation Test', () => {
    it('should generate a thumbnail from a public image url and return the resized image if Authorization token is present', (done) => {
      request.agent(app)
        .post('/api/thumbnail')
        .set('Authorization', Authorization)
        .send({ imageLink: imageLink })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body.status == 'successful');
        })
      done()
    })

    it('it should not process image if Authorization token is invalid', (done) => {
      request.agent(app)
        .post('/api/thumbnail')
        .set('Authorization', '')
        .send({ imageLink: imageLink })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403)
        })
      done()
    })

    it('it should not process image if url is invalid', (done) => {
      request.agent(app)
        .post('/api/thumbnail')
        .set('Authorization', Authorization)
        .send({ imageLink: '' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400)
        })
      done()
    })
  })
  });