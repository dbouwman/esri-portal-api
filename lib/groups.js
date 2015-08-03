/**
 * ArcGIS Online API /community/groups related functions
 */
var Q = require('q'),
  request = require('request'),
  helper = require('./helpers');

/**
 * Groups
 */
function Groups(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
}

module.exports = Groups;



/**
 * Get Group Details
 */
Groups.prototype.get = function(token, groupId){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/groups/' + groupId + '?f=json&token=' + token;
  helper.get(url, dfd);

  return dfd.promise;
};

/**
 * Get the items in a group
 */
Groups.prototype.items = function(token, groupId){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/groups/' + groupId + '?f=json&token=' + token;
  helper.get(url, dfd);

  return dfd.promise;
};

/**
 * Update Group
 *
 * The Update Group operation (POST only) modifies properties such as the group title, 
 * tags, description, sort field and order, and member sharing capabilities. Available 
 * only to the group administrators or to the administrator of the organization if 
 * the user is a member.
 */

Groups.prototype.update = function(token, group){
  var dfd = Q.defer();
  //community/groups/2ecb37a8c8fb4051af9c086c25503bb0/update
  var url = this.baseUrl + '/community/groups/' + group.id + '/update?f=json&token=' + token;
  
  var options = {
      url: url,
      method: "POST",
      form: group
    };
  helper.post(options, dfd);
  return dfd.promise;
};

/**
 * Invite to Group
 *
 * A group administrator can invite users to join their group using the Invite
 * to Group operation. This creates a new user invitation, which the users
 * accept or decline. The role of the user and the invitation expiration date
 * can be set in the invitation. A notification is created for the user
 * indicating that they were invited to join the group. Available only to
 * authenticated users.
 */
Groups.prototype.invite = function(token, groupId, users){
  var dfd = Q.defer();
  //community/groups/2ecb37a8c8fb4051af9c086c25503bb0/invite
  var url = this.baseUrl + '/community/groups/' + groupId + '/invite?f=json&users=' + users + '&token=' + token;

  var options = {
    url: url,
    method: "POST",
	form: {id:groupId}
  };
  helper.post(options, dfd);
  return dfd.promise;
};

/**
 * Create Group
 *
 * Only authenticated users can create groups. The user who creates the group 
 * automatically becomes the owner of the group. The owner of the group is 
 * automatically an administrator of the group
 */

Groups.prototype.create = function(token, group){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/createGroup?f=json&token=' + token;
  
  var options = {
      url: url,
      method: "POST",
      form: group
    };
  helper.post(options, dfd);
  return dfd.promise;
};