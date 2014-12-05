/**
 * ArcGIS Online API /community/user related functions
 */
var Q = require('q'),
  request = require('request'),
  helper = require('./helpers');

/**
 * Users
 */
function Users(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
}

module.exports = Users;

/**
 * User
 *
 * Personal details of the user, such as e-mail and groups, are 
 * returned only to the user or the administrator of the user's organization
 */
Users.prototype.get = function(token, username){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/users/' + username +'?f=json&token=' + token;
  helper.get(url, dfd);

  return dfd.promise;
};

/**
 * Update User
 *
 * For the "arcgis" identity provider, password, full name, security question, 
 * and security answer can be updated with Update User. Update User is available 
 * only to the user or to the administrator of the user's organization.
 */
Users.prototype.update = function(token, user){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/users/' + user.username +'?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST",
      form: user
    };

  helper.post(options, dfd);
  return dfd.promise;
};

/**
 * Tags a user has used
 *
 * Users tag the content they publish in their portal via the add and update 
 * item calls. This resource lists all the tags used by the user along with 
 * the number of times the tags have been used.
 */
Users.prototype.tags = function(token, username){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/users/' + username +'/tags?f=json&token=' + token;
  helper.get(url, dfd);

  return dfd.promise;
};

