/**
 * ArcGIS Online API /portal related functions
 */

var Q = require('q'),
  request = require('request'),
  helper = require('./helpers');

function Token(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
}

module.exports = Token;

Token.prototype.exchangeCode = function(code, clientId, redirectUri){
  
  var dfd = Q.defer();
  //sharing/oauth2/token?redirect_uri=http://localhost:3000/postauth&grant_type=authorization_code&code=
  var url = this.baseUrl + '/oauth2/token?f=json&redirect_uri=' + redirectUri + '&grant_type=authorization_code&code=' + code + '&client_id=' + clientId;
  this.logger.info('sending GET to ' + url);
  helper.get(url, dfd);
  return dfd.promise;
}

Token.prototype.exchangeRefreshToken = function(refreshToken, clientId){
  console.log('Token.exchangeRefreshToken: refresh_token: ' + refreshToken + ' ClientId: ' + clientId);
  var dfd = Q.defer();
  var url = this.baseUrl + '/oauth2/token?f=json&grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id=' + clientId;
  console.log('sending GET to ' + url);
  this.logger.info('sending GET to ' + url);
  
  helper.get(url, dfd);
  return dfd.promise;
}

