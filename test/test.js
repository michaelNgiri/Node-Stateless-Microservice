let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();

  describe('/POST should login a user', () => {
      it('Login a user', (done) => {
        chai.request(server)
            .get('/api/login')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });