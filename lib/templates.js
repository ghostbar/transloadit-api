//
// Module: Templates
// =================
//
'use strict';

//
// <a name='constructor'></a>
// Constructor
// -----------
//
function Templates (opts, uri) {
  ['key', 'secret'].forEach(function (item) {
    if (opts[item] == null)
      throw new Error('There\'s a required argument missing: ' + item);
  });

  this.opts = opts;
  this.uri = uri;
}

//
// <a name='create'></a>
// Create a template
// -----------------
//
// #### Arguments
//
// + `params` -- Required
//   - `template`
//   - `auth` is required as well but this is created together with the signature
//   before doing the `POST` request inside this method.
// + `callback` - Function Callback
//
// #### Returns
//
// A `Callback` function with `(err, body)` from the request.
//
// #### Code
Templates.prototype.create = function (params, callback) {
  var self = this;
  var signature = new (require('./signature.js'))(self.opts);
  var request = require('request');

  if (params == null)
    return callback(new Error('params are required'));

  ['template'].forEach(function (item) {
    if (params[item] == null)
      return callback(new Error('Required param mising: ' + item));
  });

  var r = request.post(
    self.uri.base + self.uri.templates,
    function (err, response, body) {
      if (err)
        return callback(err);

      return callback(null, body);
  });

  var form = r.form();

  var x = signature.create(params);

  form.append('signature', x.signature);
  form.append('params', JSON.stringify(x.params));
};

//
// <a name='edit'></a>
// Edit a template
// ---------------
//
// #### Arguments
//
// + `params` -- Required
//   - `name`
//   - `template`
//   - `auth` is required as well but this is created together with the signature
//   before doing the `PUT` request inside this method.
// + `callback` - Function Callback
//
// #### Returns
//
// A `Callback` function with `(err, body)` from the request
//
// #### Code
Templates.prototype.edit = function (params, templateId, callback) {
  var self = this;
  var signature = new (require('./signature.js'))(self.opts);
  var request = require('request');

  if (params == null)
    return callback(new Error('params are required'));

  ['name', 'template'].forEach(function (item) {
    if (params[item] == null)
      return callback(new Error('Required param missing: ' + item));
  });

  var x = signature.create(params);
  var payload = {
    params: x.params,
    signature: x.signature
  };

  request({
    method: 'PUT',
    uri: self.uri.base + self.uri.templates + '/' + templateId,
    body: JSON.stringify(payload)
  }, function (err, response, body) {
    if (err)
      return callback(err);

    return callback(null, body);
  });
};

module.exports = Templates;