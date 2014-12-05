/**
 * Comments
 */

var Q = require('q'),
  request = require('request'),
  helper = require('./helpers');

/**
 * Comments
 */
function Comments(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
}

module.exports = Comments;

/**
 * Get list of comments for an item
 */
Comments.prototype.list = function(token, itemId, commentId){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/items/' + itemId +'/comments?f=json&token=' + token;
  helper.get(url, dfd);
  return dfd.promise;
};

/**
 * Get a specific comment on an item
 */
Comments.prototype.get = function(token, itemId, commentId){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/items/' + itemId +'/comments/'+commentId +'?f=json&token=' + token;
  helper.get(url, dfd);
  return dfd.promise;
};

/**
 * Add comment
 */
Comments.prototype.create = function(token, itemId, comment){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/items/' + itemId +'/addComment?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST",
      form: {comment:comment}
    };

  helper.post(options, dfd);

  return dfd.promise;
};

/**
 * Add/Update the user's rating for an item
 */
Comments.prototype.update = function(token, itemId, commentId, comment){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/items/' + itemId +'/comments/' + commentId +'/update?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST",
      form: {comment:comment}
    };
  helper.post(options, dfd);
  return dfd.promise;
};

/**
 * Remove the user's rating for an item
 */
Comments.prototype.remove = function(token, itemId, commentId){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/items/' + itemId +'/comments/' + commentId +'/delete?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST"
    };

  helper.post(options, dfd);
  return dfd.promise;
};

