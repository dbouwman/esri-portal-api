/**
 * ArcGIS Online API /portal related functions
 */

var Q = require('q'),
  request = require('request'),
  helper = require('./helpers');

/**
 * Portal
 * @param {object} options Configuration and Logger
 */
function Portal(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
}

module.exports = Portal;


/**
 * Self
 * 
 * Call to portal.self to validate the token
 * and get the user / portal info back
 */
Portal.prototype.self = function(token){
  
  var dfd = Q.defer();
  var url = this.baseUrl + '/portals/self?f=json&token=' + token;
  this.logger.info('sending GET to ' + url);
  
  helper.get(url, dfd);
  return dfd.promise;
}

/**
 * Portal Users
 *
 * Lists all the members of the organization. The start and num paging parameters are supported.
 */
Portal.prototype.users = function(token, portalId, start, num){
  var dfd = Q.defer();
  var url = this.baseUrl + '/portals/' + portalId + '/users?f=json&token=' + token;
  if(num){
    url = url + '&num='+num;
  }
  if(start){
    url = url + '&start='+start;
  }
  this.helper.get(url, dfd);

  return dfd.promise;
}

/**
 * Portal by Id
 *
 * Portal returns information on your organization and is accessible to administrators. 
 * Publishers and information workers can view users and resources of the organization.
 */
Portal.prototype.get = function(token, portalId){
  var dfd = Q.defer();
  var url = this.baseUrl + '/portals/' + portalId + '?f=json&token=' + token;
  this.helper.get(url, dfd);

  return dfd.promise;
}

/**
 * Update a portal
 *
 * The Update operation (POST) allows administrators only to update the organization 
 * information such as name, description, thumbnail, and featured groups.
 */

Portal.prototype.update = function(token, portal){
  var dfd = Q.defer();
  var url = this.baseUrl + '/portals/' + portal.id +'/update?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST",
      form: portal
    };

  this.helper.post(options, dfd);
  return dfd.promise;
}

