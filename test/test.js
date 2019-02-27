const { expect } = require('chai')
const request = require('supertest')

const app = require('../app')



const imageLink = 'https://images-na.ssl-images-amazon.com/images/I/41u-ekL7%2B3L.jpg'
const json = '{ "user": { "firstName": "peter", "lastName": "Ramirez" } }'
const jsonPatch = '[{"op": "replace", "path": "/user/firstName", "value": "Michael"}, {"op": "replace", "path": "/user/lastName", "value": "Ngiri"}, { "op": "add", "path": "/status", "value": { "name": "pro" } }]'
const fakeJsonPatch = 'fake'


describe('Test for Stateless Microservice with Node.JS', () => {
  let Authorization='eyJhbGciOiJIUzI1NiJ9.YWx2ZWlz.2KkZh4heCt15qBqZ0-yB-A1V9_V_dfhKwDQ4dss29n4';
  // Mock user authentication
  describe('Authentication Test', () => {
    it('should login a user with any username/password combination and return JWT Authorization', (done) => {
      request.agent(app)
        .post('/api/auth/login')
        .send({ username: 'username', password: 'password' })
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          expect(res.body).to.have.property('Authorization');
          global.Authorization = res.body.Authorization;
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
console.log("the authorization:"+Authorization)
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


    it('should not process image if Authorization token is invalid', (done) => {
      request.agent(app)
        .post('/api/thumbnail')
        .set('Authorization', '')
        .send({ imageLink: imageLink })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403)
        })
      done()
    })

    it('should not process image if url is invalid', (done) => {
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



    describe('JSON Patch Test', () => {
    it('should patch json files with the right syntax if Authorization token is correct', (done) => {
      request.agent(app)
        .patch('/api/patch')
        .set('Authorization', Authorization)
        .send({ json, jsonPatch})
        .end((err, res) => {
          expect(res.statusCode).to.equal(200)
          done()
        })
    })

    it('shouldreturn a 403 error if Authorization token is absent', (done) => {
      request.agent(app)
        .patch('/api/patch')
        .set('Authorization', '')
        .send({ json, jsonPatch })
        .end((err, res) => {
          expect(res.statusCode).to.equal(403)
        })
      done()
    })

    it('should return a 400 error if Authorization token is present but json is invalid', (done) => {
      request.agent(app)
        .patch('/api/patch')
        .set('Authorization', Authorization)
        .send({ json, fakeJsonPatch })
        .end((err, res) => {
          expect(res.statusCode).to.equal(400)
        })
      done()
    })

  })


  });

