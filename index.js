//
// transloadit-api
// ===============
//
// A (work-in-progress) Transloadit API.
//
'use strict';

var Signature = require('./lib/signature'),
  Assemblies = require('./lib/assemblies'),
  uri = {
    base: 'http://api2.transloadit.com',
    assemblies: '/assemblies'
  };

module.exports = function (opts) {
  return {
    signature: new Signature(opts),
    assembly: new Assemblies(opts, uri)
  };
};
