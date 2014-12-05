var nock = require('nock')
  , chai        = require('chai')
  , EsriPortal  = require('../index');
var expect = chai.expect;

var scope;
var prodUrl = 'https://www.arcgis.com';

describe('module configuration', function () {

  afterEach(function() {
    nock.cleanAll()
  });

  it("accepts non-default baseUrl", function(done) {
    ago = new EsriPortal({baseUrl:'https://fakeago.com/rest'});
    scope = nock('https://fakeago.com')
            //.log(console.log)
            .get('/rest/portals/self?f=json&token=some-fake-token')
            .reply(200, {});

    ago.portal.self('some-fake-token')
    .then(function(selfJson){
      scope.done();
      done();
    })
    .done();
  });

});