var iControl = require ('iControl');
var util = require ('util');

var bigip;

// Constructor
var dg = function(opts) {
  this.debug  = (typeof opts.debug  === 'boolean') ? opts.debug  : false;
  // set API connection and authentication
  bigip = new iControl(opts);
};

var dgPath = '/ltm/data-group/internal/';

dg.prototype.create = function(name, type='string', location='internal',
  partition='Common', cb) {
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

dg.prototype.delete = function(name, location='internal', partition='Common', cb) {
  dgPath = dgPath+'~'+partition+'~'+name;
  console.log('TEST: ', dgPath);
  bigip.delete(dgPath, function(err, data) {
    if (err) throw err;
    cb(data);
  });
};

module.exports = dg;
