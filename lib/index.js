'use strict';
var hasES6Promise = (global.Promise && global.Promise.toString().indexOf('[native code]'));
if (!hasES6Promise)
  module.exports = require('./es6promise');
else
  module.exports = require('./es5promise');
