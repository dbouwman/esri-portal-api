/**
 * Helper for requests to AGO api
 */

var Q = require('q'),
    request = require('request');

var api = {};
module.exports = api;

/**
 * Centralized Http Get
 */
api.get = function(url, dfd){
  console.log('GET ' + url);
  request.get(url, function(err,response,body){
    if(err){
      dfd.reject(err);
    }else{
      //parse the body and check for error
      var data = JSON.parse(body);
      if(data.error){
        console.info('rejecting with ', data);
        dfd.reject(data);
      }else{
        dfd.resolve(data)
      }
    }
  });
};

api.post = function(options,dfd){
  //do the post
  request(options, function(error, response, body){
    if(response.statusCode != 200){
      dfd.reject();
    }else{
      var data = JSON.parse(body);
      if(data.error){
        dfd.reject(data);
      }else{
        dfd.resolve(data);
      }
    }
  });
};

