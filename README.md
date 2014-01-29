transloadit-api [![Build Status](https://secure.travis-ci.org/ghostbar/transloadit-api.png)](http://travis-ci.org/ghostbar/transloadit-api)
===============

A Node.js library (WPI) for Transloadit's API.

[![NPM](https://nodei.co/npm/transloadit-api.png?stars&downloads)](https://nodei.co/npm/transloadit-api/) [![NPM](https://nodei.co/npm-dl/transloadit-api.png)](https://nodei.co/npm/transloadit-api/)

Quick-usage
-----------

    var signer = require('transloadit-api')({'key': '...', 'secret': '...'}),
      x;

    x = signer.create(paramsStepsOrTemplateId);

    /* now x has a signature for the given parameters */

Author
------
© 2014, Jose Luis Rivas `<me@ghostbar.co>`

License
-------
The files are licensed under the MIT terms.
