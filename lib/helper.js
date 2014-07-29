'use strict';

function callError (errMsg, cb) {
  if (cb == null)
    throw new Error(errMsg);
  else
    cb(errMsg);
}

function checkArr (v, arr, errMsg, cb) {
  arr.forEach(function (item) {
    if (v[item] == null) {
      callError(errMsg, cb);
      return true;
    }
  });
 }

 function init (opts, uri) {
   checkArr(opts, ['key', 'secret'], 'There\'s a required arg missing');
   this.opts = opts;
   this.uri = uri;
 }

 module.exports.callError = callError;
 module.exports.checkArr = checkArr;
 module.exports.init = init;
