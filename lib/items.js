/**
 * ArcGIS Online API /community/user related functions
 */
var Q = require('q'),
  request = require('request'),
  Ratings = require('./ratings'),
  Comments = require('./comments'),
  helper = require('./helpers');

/**
 * Items
 */
function Items(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
  this.ratings = new Ratings(options);
  this.comments = new Comments(options);
}

module.exports = Items;


/**
 * List User's Item
 */
Items.prototype.list = function(token, userName){
  var dfd = Q.defer();
  var url = this.baseUrl +'/content/users/' + userName + '?f=json&token=' + token;
  this.helper.get(url, dfd);
  return dfd.promise;
};


/**
 * Get Item
 */
Items.prototype.get = function(token, id){
  var dfd = Q.defer();
  var url = this.baseUrl +'/content/items/' + id + '?f=json&token=' + token;
  this.helper.get(url, dfd);
  return dfd.promise;
};

/**
 * Get Item Data
 */
Items.prototype.data = function(token, id){
  var dfd = Q.defer();
  var url = this.baseUrl +'/content/items/' + id + '/data?f=json&token=' + token;
  this.helper.get(url, dfd);
  return dfd.promise;
};

/**
 * Create Item
 */
Items.prototype.create = function(token, username, item){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/users/' + username +'/addItem?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST",
      form: item
    };

  helper.post(options, dfd);
  return dfd.promise;
};

/**
 * Update Item
 */
Items.prototype.update = function(token, username,  item){
  var dfd = Q.defer();
  console.log('In items.update');
  var url = this.baseUrl + '/content/users/' + username +'/items/' +item.id +'/update?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST",
      form: item
    };
  console.log('POSTing to ' + url);
  helper.post(options, dfd);
  return dfd.promise;
};

/**
 * Delete Item
 */
Items.prototype.remove = function(token, username, id){
  var dfd = Q.defer();
  var url = this.baseUrl + '/content/users/' + username +'/items/' + id + '/delete?f=json&token=' + token;
  var options = {
      url: url,
      method: "POST"
    };

  helper.post(options, dfd);
  return dfd.promise;
}



