/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index');
var optional = require('optional');
var config = optional('./config.json') || {'key': 'random', 'secret': 'random'};
var should = require('should');

describe('TransloadIt.Assembly Module:', function () {
  describe('Assembly loading from the global export', function () {
    var a = require('../index')(config);

    it('should create the global export Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `assembly` Object', function () {
      should.exist(a.assembly);

      a.assembly.should.be.an.instanceOf(Object);
    });
  });

  describe('Assembly loading as a new Object', function () {
    var a = new TransloaditLib.Assembly(config);

    it('should create the Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `post` Function', function () {
      should.exist(a.post);
    });
  });

  describe('Assembly loading with just require', function () {
    var a = require('../index').Assembly(config);

    it('should create the Object', function () {
      a.should.be.an.instanceOf(Object);
    });

    it('should have the `post` Function', function () {
      should.exist(a.post);
    });
  });

});
