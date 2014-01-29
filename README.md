transloadit-api
===============

A Node.js library (WPI) for Transloadit's API.

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
