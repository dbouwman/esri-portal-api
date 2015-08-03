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

  describe('groups', function () {
    it("get group", function(done) {
      scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/community/groups/123GROUPID456?f=json&token=sometoken')
              .reply(200, {});

      ago.community.groups.get('sometoken', '123GROUPID456')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();

    });

    it("update group", function(done) { 
      var fakeGroup = {
        "id": "123GROUPID456"
      };
      scope = nock(prodUrl)
              .post('/sharing/rest/community/groups/123GROUPID456/update?f=json&token=sometoken', fakeGroup)
              .reply(200, fakeGroup);

      ago.community.groups.update('sometoken',fakeGroup)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });  

    it("invite to group", function(done) {
      var fakeGroup = {
        "id": "123GROUPID456"
      };
      scope = nock(prodUrl)
              .post('/sharing/rest/community/groups/123GROUPID456/invite?f=json&users=someuser&token=sometoken', fakeGroup)
              .reply(200, fakeGroup);

      ago.community.groups.invite('sometoken', fakeGroup.id, 'someuser')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

  });//groups
});//community