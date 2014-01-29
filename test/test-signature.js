/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index'),
    config = require('./config.json'),
    should = require('should');

describe('TransloadIt.Signature Module:', function () {
  describe('Signature loading from the global export', function () {
    var sig = require('../index')(config);

    it('should create the global export Object', function () {
      sig.should.be.an.instanceOf(Object);
    });

    it('should have the `signature` Object', function () {
      should.exist(sig.signature);

      sig.signature.should.be.an.instanceOf(Object);
    });
  });

  describe('Signature loading as a new Object', function () {
    var sig = new TransloaditLib.Signature(config);

    it('should create the Object', function () {
      sig.should.be.an.instanceOf(Object);
    });

    it('should have the `create` Function', function () {
      should.exist(sig.create);
    });
  });

  describe('Signature loading with just require', function () {
    var sig = require('../index').Signature(config);

    it('should create the Object', function () {
      sig.should.be.an.instanceOf(Object);
    });

    it('should have the `create` Function', function () {
      should.exist(sig.create);
    });
  });

  describe('Creation of signature', function () {
    var sig = new TransloaditLib.Signature(config),
      params = {
        'template_id': 'Random'
      },
      x = sig.create(params);

    it('should create a new signature', function () {
      x.should.be.an.instanceOf(Object);
    });

    it('should have a signature String', function () {
      should.exist(x.signature);

      x.signature.should.be.an.instanceOf(String);
    });

    it('should have a params Object', function () {
      should.exist(x.params);

      x.params.should.be.an.instanceOf(Object);
    });

    it('params should have auth with key and expires', function () {
      should.exist(x.params.auth);

      should.exist(x.params.auth.key);

      should.exist(x.params.auth.expires);
    });

  });
});
