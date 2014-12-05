var nock = require('nock')
  //, sinon       = require('sinon')
  , chai        = require('chai')
  , fixtures    = require('./portal-fixtures')
  , EsriPortal  = require('../index');
var expect = chai.expect;

var scope;
var prodUrl = 'https://www.arcgis.com';

describe('content ', function () {
  beforeEach(function() {
    ago = new EsriPortal();
  });

  afterEach(function() {
    nock.cleanAll()
  });

  describe('items', function () {
    

    it("list ", function(done) {    

      scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/content/users/testuser?f=json&token=sometoken')
              .reply(200, {});

      ago.content.items.list('sometoken', 'testuser')
      .then(function(selfJson){
        scope.done();
        done();
      })
      .done();
    });

    it("get Item", function(done) {
      scope = nock(prodUrl)
              .get('/sharing/rest/content/items/123ITEMID456?f=json&token=sometoken')
              .reply(200, {});

      ago.content.items.get('sometoken', '123ITEMID456')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();

    });

    it("update item", function(done) { 
      var fakeItem = {
        "id":"123ITEMID456",
        "name":"Fake Item"
      };
      scope = nock(prodUrl)
              .post('/sharing/rest/content/users/testuser/items/123ITEMID456/update?f=json&token=sometoken', fakeItem)
              .reply(200, {});

      ago.content.items.update('sometoken','testuser', fakeItem)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });   

    it("create item", function(done) { 
      var fakeItem = {
        "id":"123ITEMID456",
        "name":"Fake Item"
      };
      scope = nock(prodUrl)
              .post('/sharing/rest/content/users/testuser/addItem?f=json&token=sometoken', fakeItem)
              .reply(200, {});

      ago.content.items.create('sometoken','testuser', fakeItem)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    }); 

    it("delete item", function(done) { 
      scope = nock(prodUrl)
              .post('/sharing/rest/content/users/testuser/items/123ITEMID456/delete?f=json&token=sometoken')
              .reply(200, {});

      ago.content.items.remove('sometoken','testuser', '123ITEMID456')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    }); 

  });

  describe('ratings', function () {
      
    it("get rating", function(done) {
      scope = nock(prodUrl)
              .get('/sharing/rest/community/items/123ITEMID456/rating?f=json&token=sometoken')
              .reply(200, {});

      ago.content.items.ratings.get('sometoken', '123ITEMID456')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();

    });

    it("update rating", function(done) { 
      var data = {
        "rating":4.5
      };
      scope = nock(prodUrl)
              //.log(console.log)
              .post('/sharing/rest/community/items/123ITEMID456/addRating?f=json&token=sometoken', data)
              .reply(200, {});

      ago.content.items.ratings.update('sometoken','123ITEMID456', 4.5)
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });   

    it("delete rating", function(done) { 
      scope = nock(prodUrl)
              //.log(console.log)
              .post('/sharing/rest/community/items/123ITEMID456/deleteRating?f=json&token=sometoken')
              .reply(200, {});

      ago.content.items.ratings.remove('sometoken','123ITEMID456')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    }); 

  });

  describe('comments', function () {
    
    it("list comments", function(done) {
      scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/content/items/123ITEMID456/comments?f=json&token=sometoken')
              .reply(200, {});
      ago.content.items.comments.list('sometoken', '123ITEMID456')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

    it("get comment", function(done) {
      scope = nock(prodUrl)
              //.log(console.log)
              .get('/sharing/rest/content/items/123ITEMID456/comments/789COMMENT987?f=json&token=some-a-token')
              .reply(200, {});
      ago.content.items.comments.get('some-a-token', '123ITEMID456','789COMMENT987')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

    it("add comment", function(done) {
      scope = nock(prodUrl)
              //.log(console.log)
              .post('/sharing/rest/content/items/123ITEMID456/addComment?f=json&token=sometoken')
              .reply(200, {});
      ago.content.items.comments.create('sometoken', '123ITEMID456','some new comment')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

    it("update comment", function(done) {
      scope = nock(prodUrl)
              //.log(console.log)
              .post('/sharing/rest/content/items/123ITEMID456/comments/789COMMENT987/update?f=json&token=sometoken')
              .reply(200, {});
      ago.content.items.comments.update('sometoken', '123ITEMID456', '789COMMENT987','updated comment')
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

    it("delete comment", function(done) {
      scope = nock(prodUrl)
              //.log(console.log)
              .post('/sharing/rest/content/items/123ITEMID456/comments/789COMMENT987/delete?f=json&token=sometoken')
              .reply(200, {});

      ago.content.items.comments.remove('sometoken','123ITEMID456','789COMMENT987' )
      .then(function(selfJson){
        scope.done();
        done();
      }).done();
    });

  });


});