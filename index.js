//
// transloadit-api
// ===============
//
// A Transloadit API.
//
'use strict';

var Signature = require('./lib/signature');
var Assemblies = require('./lib/assemblies');
var Notifications = require('./lib/notifications');
var Templates = require('./lib/templates');
var uri = {
  base: 'http://api2.transloadit.com',
  assemblies: '/assemblies',
  notifications: '/assembly_notifications',
  templates: '/templates'
};

module.exports = function (opts) {
  return {
    signature: new Signature(opts),
    assembly: new Assemblies(opts, uri),
    notification: new Notifications(opts, uri),
    template: new Templates(opts, uri);
  };
};

module.exports.signature = module.exports.Signature = function (opts) {
  return new Signature(opts);
};

module.exports.assembly = module.exports.Assembly = function (opts) {
  return new Assemblies(opts, uri);
};

module.exports.notification = module.exports.Notification = function (opts) {
  return new Notifications(opts, uri);
};

module.exports.template = module.exports.Template = function (opts) {
  return new Templates(opts, uri);
};
