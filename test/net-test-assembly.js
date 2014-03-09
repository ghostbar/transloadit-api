/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index');
var config = require('./config.json');
var should = require('should');

describe('TransloadIt.Assembly Module Network Tests:', function () {
  describe('', function () {
    it('should post an assembly with a single file', function (done) {
      this.timeout(40000);

      var a = new TransloaditLib(config);
      var path = require('path');

      var files = {
        'file': {
          'name': 'Randomness',
          'path': path.join(__dirname, 'dialup-final.png')
        }
      };

      var params = {
        'template_id': '24a7fda83bff4cfc9bc662f585c996b4'
      };

      a.assembly.post(files, params, done);
    });
  });
});
