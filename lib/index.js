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











