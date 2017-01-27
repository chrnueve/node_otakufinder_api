var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe("Anime API", function() {
  var url = "localhost:3000/api/"

  describe("POST request", function() {
    it("returns status 200", function() {
      request(url)
      ,post('/users')
      .send({user: "test", password: "password"})
      .end(function(error, response, body) {
       expect(response.statusCode).to.equal(200);
       done();
     });

    });

    it("returns the anime object", function() {});

  });

  describe("", function() {

    it("returns status 200", function() {});

    it("creates a new anime", function() {});

  });

});
