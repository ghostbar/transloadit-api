/* global describe */
/* global it */
'use strict';

var TransloaditLib = require('../index');
var config = require('./config.json');
var should = require('should')

describe('TransloadIt.Assembly Module Network Tests:', function () {
  describe('Upload a single file file', function () {
    var a = new TransloaditLib(config);
    var path = require('path');

    var files = {
      'file': {
        'name': 'Randomness',
        'path': path.join(__dirname, 'test-image.jpg')
      }
    };

    var params = {
      'template_id': config.template_id 
    };

    it('should post an assembly with a single file', function (done) {
      this.timeout(40000);

      a.assembly.post(files, params, function(err, res) {
        should.not.exist(err);

        should.exist(res);
      });
    });
  });
});
