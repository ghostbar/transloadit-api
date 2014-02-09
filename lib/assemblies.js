//
// Module: assemblies
// ==================
//
'use strict';

var Assemblies;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = Assemblies = (function () {
  function Assemblies (opts, uri) {
    /* checking the required arguments */
    ['key', 'secret'].forEach(function (item) {
      if (opts[item] == null)
        throw new Error('There\'s a required argument missing: ' + item);
    });

    this.opts = opts;
    this.uri = uri;

    /* bindings */
    this.post = __bind(this.post, this);
  }

  // #### Returns
  // A `Callback` function with `(err, res, body)` from `request` directly.
  //
  // #### Code
  Assemblies.prototype.post = function (file, params, callback) {
    var self = this;
    var fs = require('fs');
    var request = require('request');
    var r = request.post(self.uri.base + self.uri.assemblies, callback); /* Here's the callback! */
    var SignatureLib = require('./signature');
    var signature = new SignatureLib(self.opts);
    var form = r.form();
    var x;

    x = signature.create(params);

    /* TODO: Support multiple files */
    form.append('file', fs.createReadStream(file));
    form.append('signature', x.signature);
    form.append('params', x.params);
  };

  return Assemblies;
})();
