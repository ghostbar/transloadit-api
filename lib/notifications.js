//
// Module: notifications
// =====================
//
'use strict';
var helper = require('./helper');
//
// <a name='constructor'></a>
// Constructor
// -----------
//
// #### Code
function Notifications (opts, uri) {
  helper.init.call(this, opts, uri);
}

//
// <a name='retrieve'></a>
// Public: retrieve assembly notification list
// -------------------------------------------
//
// More docs [here](https://transloadit.com/docs/api-docs#retrieve-notification-list)
//
// #### Parameters
//
// + `params` - Object
//   - `page`
//   - `pagesize` - Number, max 5000.
//   - `type`
//   - `assembly_id` - [Required] String
// + `signature` - Signature Object (See signature module)
// + `callback` - Callback Function
//
// #### Code
Notifications.prototype.retrieve = function (params, signature, callback) {
  var self = this;
  var request = require('request');

  if (!params || !params.assembly_id || !signature)
    return callback(new Error('Missing params or signature'));

  if (params && params.pagesize && params.pagesize > 5000)
    return callback(new Error('pagesize can\'t be bigger than 5000'));

  var url = self.uri.base + self.uri.notifications;

  var qs = {
    params: params,
    signature: signature
  };

  request({
    method: 'GET',
    uri: url,
    qs: qs
  }, function (err, response, body) {
    if (err)
      return callback(err);

    return callback(null, body);
  });
};

//
// <a name='replay'></a>
// Public: replay assembly notification
// ------------------------------------
//
// More docs [here](https://transloadit.com/docs/api-docs#replay-assembly-notification)
//
// #### Parameters
//
// + `assemblyId` - assembly's id
// + `params` - Object with `auth` (required) and `notify_url` (optional)
// + `callback` - Callback Function
//
// #### Code
Notifications.prototype.replay = function (assemblyId, params, callback) {
  var self = this;
  var request = require('request');

  var url = self.uri.base + self.uri.notifications;
  url += '/' + assemblyId + '/replay';

  request({
    method: 'POST',
    uri: url,
    form: params
  }, function (err, response, body) {
    if (err)
      return callback(err);

    return callback(null, body);
  });
};

module.exports = Notifications;
