//
// transloadit-api
// ===============
//
// A (work-in-progress) Transloadit API.
//
'use strict';

var Signature = require('./lib/signature'),
  uri = {
    base: 'https://api2.transloadit.com',
  };

module.exports = function (opts) {
  return {
    signature: new Signature(opts)
  };
};
