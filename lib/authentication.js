
/**
 * ArcGIS Online API token fetching
 */


var request = require('request'),
    Q = require('q');


function getToken (username, password, options) {
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
}



exports.getToken = getToken;