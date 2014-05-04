//
// Module: assemblies
// ==================
//
'use strict';

//
// <a name='constructor'></a>
// Constructor
// -----------
//
// #### Code
function Assemblies (opts, uri) {
  /* checking the required arguments */
  ['key', 'secret'].forEach(function (item) {
    if (opts[item] == null)
      throw new Error('There\'s a required argument missing: ' + item);
  });

  this.opts = opts;
  this.uri = uri;

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

module.exports = Assemblies;
