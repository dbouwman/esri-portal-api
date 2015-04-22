/**
 * esri-portal.js
 *
 * Promisified Wrapper for the AGO Rest API
 */
var Q = require('q'),
    request = require('request'),
    helper = require('./helpers'),
    Community = require('./community'),
    Portal = require('./portal'),
    Token = require('./token'),
    Content = require('./content');


/**
 * Contstructor
 */
function EsriPortal(options){

  if(!options){
    var options = {};
  }
  
  if( !options.baseUrl){
    options.baseUrl = "https://www.arcgis.com/sharing/rest";
  }

  if( !options.logger){
    //stub it
    options.logger = {
      info: function(){}
    };
  }else{
    //ensure the api we want
    if(!options.logger.info){
      options.logger.info = function(){};
      console.warn('Logger passed to esri-portal does not expose an info function!');
    }
  }

  this.baseUrl = options.baseUrl;
  //wire in the sub-modules
  this.content = new Content(options);
  this.community = new Community(options);
  this.portal = new Portal(options);
  this.token = new Token(options);
}

module.exports = EsriPortal;

/**
 * Search
 */
EsriPortal.prototype.search = function(options){

  var qs =  encodeURIComponent( options.query );
  var dfd = Q.defer();
  var url = this.baseUrl + '/search?q=' + qs;

  if(options.start){
    url += "&start=" + options.start;
  }

  if(options.num){
    url += "&num=" + options.num;
  }

  if(options.sortField){
    url += "&sortField=" + options.sortField;
  }
  if(options.sortOrder){
    url += "&sortOrder=" + options.sortOrder;
  }
  if(options.token){
    url +="&token=" + options.token;
  }
  //add json
  url += '&f=json';

  helper.get(url, dfd);

  return dfd.promise;
  
}

/**
 * Get a token from online
 */
EsriPortal.prototype.getToken = function(username, password, options) {
  var dfd = Q.defer();
  var url = "https://www.arcgis.com/sharing/generateToken";

  console.log('getToken options ', options);

  if (options && options.authenticationUrl) {
    url =  options.authenticationUrl;
  }


  var data = {
    username: username,
    password: password,
    f:        "json",
    referer:  "geoservices-js"
  };

  if (options) {
    if (options.expiration){
      data.expiration = options.expiration;
    }
    if (options.referer){
      data.referer = options.referer;
    }
  }

  var self = this;

  function internalCallback (err, body, data) {
    var token;
    // If authentication succeeds, store the response as 'token' on the calling object
    // Keys in the 'data' object include 'token', 'expires', and 'ssl'
    if (data) {
      try {
        token = JSON.parse(data);
        dfd.resolve(token);
      } catch (jsonParseError) {
        //callback("Error parsing JSON in authentication response: "+jsonParseError, token);
        dfd.reject("Error parsing JSON in authentication response: "+jsonParseError, token)
        //return;
      }
    }else{
      dfd.reject(err);
    }
    //callback(err, token);
  }

  if (options.requestHandler) {
    options.requestHandler.post(url, data, internalCallback);
  } else {
    console.log('POST to ' + url);
    request.post({url:url,form:data}, internalCallback);
  }

  return dfd.promise;
};











