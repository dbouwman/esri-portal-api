/**
 * Ratings
 */

var Q = require('q'),
  request = require('request'),
  helper = require('./helpers');

/**
 * Ratings
 */
function Ratings(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
}

module.exports = Ratings;


/**
 * Get the Rating the current user has applied to an item
 */
Ratings.prototype.get = function(token, id){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/items/' + id +'/rating?f=json&token=' + token;
  helper.get(url, dfd);
  return dfd.promise;
};

/**
 * Add/Update the user's rating for an item
 */
Ratings.prototype.update = function(token, id, rating){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/items/' + id +'/addRating?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST",
      form: {rating:rating}
    };

  helper.post(options, dfd);

  return dfd.promise;
};

/**
 * Remove the user's rating for an item
 */
Ratings.prototype.remove = function(token, id){
  var dfd = Q.defer();
  var url = this.baseUrl + '/community/items/' + id +'/deleteRating?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST"
    };

  helper.post(options, dfd);
  return dfd.promise;
};

