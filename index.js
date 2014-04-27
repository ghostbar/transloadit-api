//
// transloadit-api
// ===============
//
// A Transloadit API.
//
'use strict';

var Signature = require('./lib/signature');
var Assemblies = require('./lib/assemblies');
var uri = {
  base: 'http://api2.transloadit.com',
  assemblies: '/assemblies'
};

module.exports = function (opts) {
  return {
    signature: new Signature(opts),
    assembly: new Assemblies(opts, uri)
  };
};

module.exports.signature = module.exports.Signature = function (opts) {
  return new Signature(opts);
};

module.exports.assembly = module.exports.Assembly = function (opts) {
  return new Assemblies(opts, uri);
};
