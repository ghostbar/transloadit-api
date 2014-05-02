/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index');
var config = require('./config.json');
var should = require('should');

describe('TransloadIt.Notification Module Network Tests:', function () {
  describe('Retrieve notifications for an Assembly', function () {
    var a = new TransloaditLib(config);

    it('should retrieve a notification', function () {
      var sig = a.signature.create(config.retrieve.params);
      a.notification.retrieve(sig.params, sig.signature, function (err, res) {
        should.not.exist(err);

        should.exist(res);
      });
    });

  });

  describe('Replay notifications for an Assembly', function (){
    var a = new TransloaditLib(config);

    it('should replay a notification', function () {
      a.notification.replay(
        config.replay.assemblyId, 
        config.replay.params, 
        function (err, res) {
          should.not.exist(err);

          should.exist(res);
      });
    });
  });
});
