var request     = require('request')
  , sinon       = require('sinon')
  , chai        = require('chai')
  , config      = require('nconf') 
  , EsriPortal  = require('../index');
var expect = chai.expect;

var spyLogger, ago, configObj;

xdescribe('portal', function () {

  before(function(done){


    //setup a spy logger
    spyLogger = {
      info : function(obj) {
        console.info(obj);
      },
      error : sinon.spy()
    };

    //setup the configuration for the tests
    configObj = {
      "ago": {
        "rest": "http://fakeago.com/rest"
      }
    }
    config.add('test', { type: 'literal', store: configObj });

    //all done!
    done();
  });

  // after(function(done){
  //   //reset the stub
  //   request.get.restore();
  //   done();
  // });


  beforeEach(function() {
    ago = new EsriPortal({config:config, logger:spyLogger});
  });



  describe('portal.self', function () {
    afterEach(function(done) {
      if(request.get.restore){
        request.get.restore();  
      }
      
      done();
    });
    
    it("should call portal/self with token", function(done) {    

      sinon.stub(request, 'get', function(url, cb){
        cb(null, {}, JSON.stringify({mock:"data"}) );
      });

      ago.portal.self('some-fake-token')
      .then(function(selfJson){
        expect(request.get.called).to.be.true();
        expect(request.get.args[0][0]).to.equal('http://fakeago.com/rest/portals/self?f=json&token=some-fake-token');
        done();
      })
      .done();
    });

    it("should reject on error payload", function(done) {
      sinon.stub(request, 'get', function(url, cb){
          cb(null, {}, JSON.stringify({error:"fake error"}) );
      });

      ago.portal.self('some-fake-token')
      .then(function(selfJson){
        //
        expect(true).to.be.false();
      })
      .fail(function(error){
        expect(request.get.called).to.be.true();
        expect(request.get.args[0][0]).to.equal('http://fakeago.com/rest/portals/self?f=json&token=some-fake-token');
        done();
      })
      .done();
    });

  });



});