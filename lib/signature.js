//
// Module: Signature
// =================
//
'use strict';

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
  var self = this;
  var expires;

  if (opts != null)
    expires = opts.expires || 15 * 60000;
  else
    expires = 15 * 60000;

  params['auth'] = {
    'key': self.opts.key,
    expires: (new Date( (new Date()).getTime() + expires) ).toISOString()
  };

  var sig = {
    signature: self.createSignature(params),
    params: params
  };

  if (callback != null)
    return callback(null, sig);

  return sig;
};

Signature.prototype.createSignature = function(params) {
  var self = this;
  var crypto = require('crypto');
  var paramString = JSON.stringify(params);

  var theSignature = crypto
    .createHmac('sha1', self.opts.secret)
    .update(
      new Buffer(
        paramString,
        'utf-8'
      )
    )
    .digest('hex');

  return theSignature;
};

module.exports = Signature;
