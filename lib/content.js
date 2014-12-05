/**
 * ArcGIS Online API /content related functions
 */

var Q = require('q'),
  request = require('request'),
  Items = require('./items'),
  helper = require('./helpers');


/**
 * Content
 */
function Content(options){
  this.logger = options.logger;
  this.baseUrl = options.baseUrl;
  this.items = new Items(options);
  this.helper = helper;
}

//export the constructor
module.exports=Content;
