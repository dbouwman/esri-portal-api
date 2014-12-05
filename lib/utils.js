/**
 * Utility Functions
 */
var Q = require('q'),
    request = require('request');
    


module.exports = function(logger){

  var api = {};

  /**
   * Centralized Http Get
   */
  api.get = function(url, dfd){

    request(url, function(err,response,body){
      if(err){
        logger.info('error: ' + err);
        dfd.reject(err);
      }else{
        //parse the body and check for error
        var data = JSON.parse(body);
        if(data.error){
          logger.info('error from ago: ' + JSON.stringify(data));
          dfd.reject(data);
        }else{
          logger.info('request success');
          dfd.resolve(data)
        }
      }
    });
  };

  /**
   * Centralized Post
   */
  api.post = function(options,dfd){
    logger.info('URL : ' + options.url);
    //do the post
    request(options, function(error, response, body){
      logger.info('POST returned ' + response.statusCode);
      if(response.statusCode != 200){
        dfd.reject();
      }else{
        logger.info('BODY: ' + JSON.stringify(body));
        var data = JSON.parse(body);
        if(data.error){
          dfd.reject(data);
        }else{
          dfd.resolve(data);
        }
      }
    });
  };

  return api;
};


