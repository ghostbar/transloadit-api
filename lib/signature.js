//
// Module: Signature
// =================
//
'use strict';

var Signature,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

module.exports = Signature = (function () {

  //
  // <a name='constructor'></a>
  // Constructor
  // -----------
  //
  function Signature (opts) {

    /* checking the required arguments */
    ['key', 'secret'].forEach(function (item) {
      if (opts[item] == null)
        throw new Error('There\'s a required argument missing: ' + item);
    });

    this.opts = opts;

    /* bindings */
    this.create = __bind(this.create, this);
  }

  //
  // <a name='create'></a>
  // Create a signature ready for consume
  // ------------------------------------
  //
  // #### Arguments
  //
  // + `params` -- params to be sent to transloadit
  // + `opts` -- Array of opts to be handled by the generator
  //   - `expires` -- (Optional) Time in miliseconds for expiration (Default
  //   is 15 minutes or 900000 ms)
  // + `Callback` function -- (Optional)
  //
  // #### Returns
  //
  // A signature, ready to be used with the payload sent to the function.
  //
  // #### Example
  //
  // ```
  // var params = {
  //   'steps': { ... }
  // },
  // opts = {
  //   'expires': '60000'
  // };
  //
  // sig(params, opts);
  // ```
  //
  // #### Code
  Signature.prototype.create = function (params, opts, callback) {
    var self = this,
      crypto = require('crypto');

    var expires = opts.expires || 15 * 60000;

    params['auth'] = {
      'key': self.opts.key,
      'expires': (new Date( (new Date()).getTime() + expires )).toUTCString()
    };

    var sig = {
      signature: crypto.createHmac('sha1', self.opts.secret).update(new Buffer(JSON.stringify(params), 'utf-8')).digest('hex'),
      params: params
    };

    if (callback != null)
      return callback(null, sig);

    return sig;
  };

  return Signature;

})();
