transloadit-api [![Build Status](https://secure.travis-ci.org/ghostbar/transloadit-api.png)](http://travis-ci.org/ghostbar/transloadit-api)
===============

A Node.js library for Transloadit's API.

It has an interface for each of the available actions for Transloadit's API: assemblies, notifications and templates.

Assemblies Interface
--------------------

### Brief

    var tlib = require('transloadit-api');
    var assembly = new tlib.assembly(credentials);

    assembly.post(files, params, callback);

### assembly.post

The `post` method is used to upload files and it can take a single fileBlob or an array of them, then a JSON with the params accepted by Transloadit and finally a callback as the third argument.

    assembly.post(fileBlob, paramsAcceptedByTransloadit, function (err, response) {
      // Do whatever you want
    });

Quick-usage
-----------

    var config = {
      key: '...',
      'secret': '...'
    };
    var signature = require('transloadit-api').Signature(config);

    var params = {
      steps: {
        encode: {
          robot: "/video/encode"
        }
      }
    };

    var x = signature.create(params);

    /* now x has a signature for the given parameters */
    /* doing `console.log(x) would give */
    {
      signature: "fec703ccbe36b942c90d17f64b71268ed4f5f512",
      params: {
        auth: {
            expires: "2010/10/19 09:01:20+00:00",
            key: "2b0c45611f6440dfb64611e872ec3211"
        },
        steps: {
            encode: {
              robot: "/video/encode"
            }
        }
      }
    }

    /* uploading files or assemblies */
    var files = {
      'random.png': {
        name: 'Randomness.png',
        path: '/path/to/file'
      }
    };

    // files can be `req.files` directly too
    var upload = require('transloadit-api').Assembly(config);
    upload.post(files, params, function (err, res) {
      /* ... */
    });


Author
------
© 2014, Jose Luis Rivas `<me@ghostbar.co>`

License
-------
The files are licensed under the MIT terms.

The image on `test/test-image.jpg` is released under the license [Creative Commons Attribution 4.0](http://creativecommons.org/licenses/by/4.0/)
