var nock = require('nock')
  //, sinon       = require('sinon')
  , chai        = require('chai')
  , fixtures    = require('./portal-fixtures')
  , EsriPortal  = require('../index');
var expect = chai.expect;

var scope;
var prodUrl = 'https://www.arcgis.com';

describe('search ', function () {
  beforeEach(function() {
    ago = new EsriPortal();
  });

  afterEach(function() {
    nock.cleanAll()
  });

  it("encodes the query string", function(done) {
    var options = {query:'title:"San Francisco" AND type:"layer package"'};
    scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/search?q=title%3A%22San%20Francisco%22%20AND%20type%3A%22layer%20package%22&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
  });

  it("accepts a simple query string", function(done) {
    var options = {query:'colorado'};
    scope = nock(prodUrl)
              .get('/sharing/rest/search?q=colorado&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
  });

  it("accepts start", function(done) {
    var options = {
      query:'colorado',
      start:12
    };
    scope = nock(prodUrl)
              .get('/sharing/rest/search?q=colorado&start=12&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
  });

  it("accepts num", function(done) {
    var options = {
      query:'colorado', 
      num:45
    };
    scope = nock(prodUrl)
              .get('/sharing/rest/search?q=colorado&num=45&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
  });

  it("accepts sortOrder", function(done) {
    var options = {
      query:'colorado', 
      sortOrder:'asc'
    };
    scope = nock(prodUrl)
              .get('/sharing/rest/search?q=colorado&sortOrder=asc&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
  });

  it("accepts sortField", function(done) {
    var options = {
      query:'colorado', 
      sortField:'title'
    };
    scope = nock(prodUrl)
              .get('/sharing/rest/search?q=colorado&sortField=title&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
  });

  it("accepts a token", function(done) {
    var options = {
      query:'colorado', 
      token:'sometoken'
    };
    scope = nock(prodUrl)
              .get('/sharing/rest/search?q=colorado&token=sometoken&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();

  });

  it("accepts everything", function(done) {
    var options = {
      query:'colorado', 
      sortOrder:'asc',
      sortField:'title',
      num:10,
      start:100,
      token:'sometoken'
    };
    scope = nock(prodUrl)
              .get('/sharing/rest/search?q=colorado&start=100&num=10&sortField=title&sortOrder=asc&token=sometoken&f=json')
              .reply(200, {});

      ago.search(options)
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
  });

});