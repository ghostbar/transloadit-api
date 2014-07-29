//
// Module: assemblies
// ==================
//
'use strict';
var helper = require('./helper');
//
// <a name='constructor'></a>
// Constructor
// -----------
//
// #### Code
function Assemblies (opts, uri) {
  helper.init.call(this, opts, uri);
}

// 
// <a name='post'></a>
// Public: send an assembly to Transloadit API
// -------------------------------------------
//
// #### Parameters
//
// + `files` - `File Object` JSON (it may have several files)
// + `params`
// + `callback` - `Callback Function`
//
// #### Returns
//
// A `Callback` function with `(err, body)` from the request.
//
// #### Code
Assemblies.prototype.post = function (files, params, callback) {
  var self = this;
  var fs = require('fs');
  var request = require('request');
  var r = request.post(self.uri.base + self.uri.assemblies, function(err, response, body) {
    /* Here's the callback, we clean up the `response` and only return `body` */
    if (err)
      return callback(err);

    return callback(null, body);
  });

  var SignatureLib = require('./signature');
  var signature = new SignatureLib(self.opts);

  var form = r.form();

  var x = signature.create(params);

  (Object.keys(files)).forEach(function (file) {
    form.append(files[file].name, fs.createReadStream(files[file].path), {
      filename: files[file].name
    });
  });

  form.append('signature', x.signature);
  form.append('params', JSON.stringify(x.params));
};

//
// <a name='cancel'></a>
// Public: cancel an assembly
// --------------------------
//
// #### Parameters
//
// + `url` - The assembly's URL returned when the assembly was created on the field `assembly_url`
// + `signature` - (Optional) signature with which the assembly was created
// + `callback` - `Callback Function`
//
// #### Returns
//
// A `Callback` function with `(err, body)` from the request.
//
// #### Code
Assemblies.prototype.cancel = function (url, signature, callback) {
  if (url == null || typeof(url) !== 'string')
    return callback(new Error('The URL (first) argument is required'));

  if (signature != null)
    url += '?signature=' + signature;

  var request = require('request');
  request({
    uri: url,
    method: 'DELETE'
  }, function (err, res, body) {
    return callback(err, body);
  });
};

module.exports = Assemblies;
