var nock = require('nock')
  , chai        = require('chai')
  , fixtures    = require('./portal-fixtures')
  , EsriPortal  = require('../index');
var expect = chai.expect;

var scope;
var prodUrl = 'https://www.arcgis.com';

describe('community ', function () {
  beforeEach(function() {
    ago = new EsriPortal();
  });

  afterEach(function() {
    nock.cleanAll()
  });

  describe('users', function () {
    it("get user ", function(done) {    

      scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/community/users/testuser?f=json&token=sometoken')
              .reply(200, {});

      ago.community.users.get('sometoken', 'testuser')
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
    });


    it("update user", function(done) { 
      var fakeUser = {
        "username": "testuser",
        "fullName": "Testy McTester",
        "preferredView": "Web"
      };
      scope = nock(prodUrl)
              .post('/sharing/rest/community/users/testuser?f=json&token=sometoken', fakeUser)
              .reply(200, {});

      ago.community.users.update('sometoken',fakeUser)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });   
    
  });//users
});//community