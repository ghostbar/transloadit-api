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

  describe('Template.create method', function () {
    var a = require('../index').Template(config);

    it('should return an error on missing params', function (done) {
      a.create(null, function (err) {
        should.exist(err);

        done();
      });
    });

    it('should return an error on missing template param', function (done) {
      a.create({}, function (err) {
        should.exist(err);

        done();
      });
    });
  });

  describe('Template.proto.retrieve method', function () {
    var a = require('../index').Template(config);

    it('should return an error on missing templateId', function (done) {
      a.retrieve(null, function (err) {
        should.exist(err);

        done();
      });
    });
  });
  
  describe('Template.proto.edit method', function () {
    var a = require('../index').Template(config);

    it('should return an error on missing params', function (done) {
      a.edit(null, null, function (err) {
        should.exist(err);
        done();
      });
    });

    it('should return an error on missing name/template from params', function (done) {
      a.edit({}, null, function (err) {
        should.exist(err);
        done();
      });
    });

    it('should return an error on missing templateId', function (done) {
      a.edit({name: 'asd', template: 'asd'}, null, function (err) {
        should.exist(err);
        done();
      });
    });
  });

  describe('Template.proto.remove method', function () {
    var a = require('../index').Template(config);

    it('should return an error on missing templateid', function (done) {
      a.remove(null, function (err) {
        should.exist(err);

        done();
      });
    });
  });

  describe('Template.proto.retrieveList method', function () {
    var a = require('../index').Template(config);

    it('should return an error on missing params', function (done) {
      a.retrieveList(null, function (err) {
        should.exist(err);

        done();
      });
    });
  });
});
