//
// Module: Templates
// =================
//
'use strict';
var helper = require('./helper');
var request = require('request');
//
// <a name='constructor'></a>
// Constructor
// -----------
//
function Templates (opts, uri) {
  helper.init.call(this, opts, uri);
}

function requester (method, templateId, qs, payload, cb) {
  var uri = this.uri.base + this.uri.templates;
  
  if (templateId)
    uri += '/' + templateId;

  var obj = {
    method: method,
    uri: uri
  };

  if (qs)
    obj.qs = qs;

  if (payload)
    obj.body = JSON.stringify(payload);

  request(obj, function (err, res, body) {
    return cb(err, body);
  });
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
  var signature = new (require('./signature.js'))(this.opts);

  if (params == null)
    return callback(new Error('params are required'));

  if (helper.checkArr(params, ['template'], 'Required param missing', callback))
    return;

  var r = request.post(
    this.uri.base + this.uri.templates,
    function (err, response, body) {
      return callback(err, body);
    });

  var form = r.form();
  var x = signature.create(params);

  form.append('signature', x.signature);
  form.append('params', JSON.stringify(x.params));
};

//
// <a name='retrieve'></a>
// Retrieve a template
// -------------------
//
// #### Arguments
//
// + `templateId`
// + `callback` -- Callback function
//
// #### Returns
//
// Returns a callback with `(err, body)`, `body` being the template JSON content
// for the given template ID.
//
// #### Code
Templates.prototype.retrieve = function (templateId, callback) {
  var signature = new (require('./signature.js'))(this.opts);

  if (templateId == null)
    return callback(new Error('templateId is required'));

  var x = signature.create();

  requester.call(this, 'GET', templateId, {signature: x.signature}, null, callback);
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
// + `templateId` -- Required
// + `callback` - Function Callback
//
// #### Returns
//
// A `Callback` function with `(err, body)` from the request
//
// #### Code
Templates.prototype.edit = function (params, templateId, callback) {
  var signature = new (require('./signature.js'))(this.opts);

  if (params == null || templateId == null)
    return callback(new Error('params and templateId are required'));

  if (helper.checkArr(params, ['name', 'template'], 'Required param missing', callback))
    return;

  var x = signature.create(params);
  var payload = {
    params: x.params,
    signature: x.signature
  };

  requester.call(this, 'PUT', templateId, null, payload, callback);
};

//
// <a name='remove'></a>
// Remove a template
// -----------------
//
// #### Arguments
//
// + `templateId` - required
// + `callback` - Callback function
//
// #### Returns
// 
// Returns a `(err, response)` with the response from the request directly.
//
// #### Code
Templates.prototype.remove = function (templateId, callback) {
  var signature = new (require('./signature.js'))(this.opts);

  if (templateId == null)
    return callback(new Error('template id is required'));

  var x = signature.create();
  var payload = {
    signature: x.signature
  };

  requester.call(this, 'DELETE', templateId, null, payload, callback);
};

//
// <a name='retrieveList'></a>
// Retrieve a list of templates
// ----------------------------
//
// #### Parameters
//
// + `params` - required. The accepted params are [here](https://transloadit.com/docs/api-docs#retrieve-template-list).
// + `callback` - Callback function
//
// #### Returns
//
// Returns a `(err, response)` with the direct response from the request.
//
// #### Code
Templates.prototype.retrieveList = function (params, callback) {
  var signature = new (require('./signature.js'))(this.opts);

  if (params == null)
    return callback(new Error('params are required'));

  var x = signature.create(params);

  requester.call(this, 'GET', null, {params: params, signature: x.signature}, null, callback);
};

module.exports = Templates;
module.exports.requester = requester;
