/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index');
var optional = require('optional');
var config = optional('./config.json') || {'key': 'random', 'secret': 'random'};
var should = require('should');

describe('TransloadIt.Template Module:', function () {
  describe('Template loading from the global export', function () {
    var a = require('../index')(config);

    it('should create the global export Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `template` Object', function () {
      should.exist(a.template);

      a.template.should.be.an.instanceOf(Object);
    });
  });

  describe('Template loading as a new Object', function () {
    var a = new TransloaditLib.Template(config);

    it('should create the Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `create` Function', function () {
      should.exist(a.create);
    });
  });

  describe('Template loading with just require', function () {
    var a  = require('../index').Template(config);

    it('should create the Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `create` Function', function () {
      should.exist(a.create);
    });
  });
});