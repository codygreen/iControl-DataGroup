var iControl = require ('iControl');
var util = require ('util');

var bigip;

// Constructor
var dg = function(opts) {
  this.debug  = (typeof opts.debug  === 'boolean') ? opts.debug  : false;
  // set API connection and authentication for iControl module
  bigip = new iControl(opts);
};

// static path for API access to data groups
var dgPath = '/ltm/data-group/internal/';

/**
  * create data group
  *
  * @param {String} name of data group
  * @param {String} type of data group (string, address, integer)
  * @param {String} location of data group (internal, external)
  * @param {String} parition of data group
  */
dg.prototype.create = function(name, type='string', location='internal',
  partition='Common', cb) {
  // JSON object to create data group
  var dgData = {
    "name":name,
    "partition":partition,
    "type":type
  };

  bigip.create(dgPath, dgData, function(err, data) {
    if (err) throw err;
    cb(data);
  });
};

/**
  * delete data group
  *
  * @param {String} name of data group
  * @param {String} location of data group (internal, external)
  * @param {String} parition of data group
  */
dg.prototype.delete = function(name, location='internal', partition='Common', cb) {
  // append the partition and dg name to the static path
  dgPath = dgPath+'~'+partition+'~'+name;
  
  bigip.delete(dgPath, function(err, data) {
    if (err) throw err;
    cb(data);
  });
};

module.exports = dg;
