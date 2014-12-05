/**
 * ArcGIS Online API /community related functions
 */
var Q = require('q'),
  request = require('request'),
  Users = require('./users.js'),
  Groups = require('./groups.js'),
  helper = require('./helpers');

/**
 * Community
 */
function Community(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.helper = helper;
  //the work is delegated to sub modules
  this.users = new Users(options);
  this.groups = new Groups(options);
}

module.exports = Community;




