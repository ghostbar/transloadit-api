/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index');
var optional = require('optional');
var config = optional('./config.json') || {'key': 'random', 'secret': 'random'};
var should = require('should');

describe('TransloadIt.Notification Module:', function () {
  describe('Assembly loading from the global export', function () {
    var a = require('../index')(config);

    it('should create the global export Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `notification` Object', function () {
      should.exist(a.notification);

      a.notification.should.be.an.instanceOf(Object);
    });
  });

  describe('Notification loading as a new Object', function () {
    var a = new TransloaditLib.Notification(config);

    it('should create the Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `retrieve` Function', function () {
      should.exist(a.retrieve);
    });

    it('should have the `replay` Function', function () {
      should.exist(a.replay);
    });
  });

  describe('Notification loading with just require', function () {
    var a = require('../index').Notification(config);

    it('should create the Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `retrieve` Function', function () {
      should.exist(a.retrieve);
    });

    it('should have the `replay` Function', function () {
      should.exist(a.replay);
    });
  });

});
