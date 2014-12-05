var nock = require('nock')
  //, sinon       = require('sinon')
  , chai        = require('chai')
  , fixtures    = require('./portal-fixtures')
  , EsriPortal  = require('../index');
var expect = chai.expect;

var scope;
var prodUrl = 'https://www.arcgis.com';

describe('portal ', function () {
  beforeEach(function() {
    ago = new EsriPortal();
  });

  afterEach(function() {
    nock.cleanAll()
  });

  describe('portalself', function () {
    

    it("should call portal/self with token", function(done) {    

      scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/portals/self?f=json&token=portal-self-good-token')
              .reply(200, fixtures.minimal.portalSelf);

      ago.portal.self('portal-self-good-token')
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
    });

    it("should reject and pass error payload", function(done) {
      scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/portals/self?f=json&token=portal-self-bad-token')
              .reply(200, fixtures.errors.invalidToken);

      ago.portal.self('portal-self-bad-token')
      .catch(function(data){
        expect(data.error).to.eql(fixtures.errors.invalidToken.error);
        scope.done();
        done();
      })
      .done();

    });


  });


  describe('portal users', function () {

    it("get users", function(done) {    
      scope = nock(prodUrl)
              .get('/sharing/rest/portals/abc123/users?f=json&token=portal-users-token')
              .reply(200, {});

      ago.portal.users('portal-users-token', 'abc123')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

    it("get 50 users starting at 121", function(done) {    
      scope = nock(prodUrl)
              .get('/sharing/rest/portals/abc123/users?f=json&token=portal-users-token&num=50&start=121')
              .reply(200, {});

      ago.portal.users('portal-users-token', 'abc123', 121,50)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

    it("get default users starting at 121", function(done) {    
      scope = nock(prodUrl)
              .get('/sharing/rest/portals/abc123/users?f=json&token=portal-users-token&start=121')
              .reply(200, {});

      ago.portal.users('portal-users-token', 'abc123', 121)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

  });

  describe('portal by id', function () {


    it("get portal details", function(done) {    
      scope = nock(prodUrl)
              .get('/sharing/rest/portals/abc123?f=json&token=portal-id-token')
              .reply(200, {});

      ago.portal.get('portal-id-token', 'abc123')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

  });




  describe('update ', function () {
    
    it("details", function(done) { 
      var fakePortal = {
        "id":"abc123",
        "name":"Test Portal"
      };
      scope = nock(prodUrl)
              .post('/sharing/rest/portals/abc123/update?f=json&token=portal-id-token', fakePortal)
              .reply(200, {});

      ago.portal.update('portal-id-token', fakePortal)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });    


  });

});