/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index');
var optional = require('optional');
var config = optional('./config.json') || {key: 'random', secret: 'random'};
var should = require('should');

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
    var sig = new TransloaditLib.Signature(config);
    var params = {
      'template_id': 'Random'
    };
    var x = sig.create(params);

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

  describe('Test create signature logic is correct', function () {
    var sig = new TransloaditLib.Signature({
      key: '2b0c45611f6440dfb64611e872ec3211',
      secret: 'd805593620e689465d7da6b8caf2ac7384fdb7e9'
    });

    var params = {
      auth: {
        expires: '2010/10/19 09:01:20+00:00',
        key: '2b0c45611f6440dfb64611e872ec3211'
      },
      steps: {
        encode: {
          robot: '/video/encode'
        }
      }
    };

    var answer = '00320965b86d42b6d983d1fad3f126ee7385b962';

    var response = sig.createSignature(params);

    it('should equal the example given in answer', function () {
      response.should.equal(answer);
    });
  });
});
