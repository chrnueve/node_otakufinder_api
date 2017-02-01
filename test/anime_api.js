var mongoose = require('mongoose');
var chai = require('chai');
var Anime = require('../app/models/anime');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../server');
var authController = require('../controllers/auth');

chai.use(chaiHttp);

// Allows the middleware to think we're already authenticated.
authController.isAuthenticated = function() {
  return true;
}

//Our parent block
describe('Animes', () => {
    beforeEach((done) => { //Before each test we empty the database
        Anime.remove({}, (err) => {
           done();
        });
    });
});
/*
* Test the /GET route
*/
describe('/GET anime', () => {
    it('it should GET all the animes', (done) => {
      chai.request(server)
          .get('/animes')
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
            done();
          });
    });
});
