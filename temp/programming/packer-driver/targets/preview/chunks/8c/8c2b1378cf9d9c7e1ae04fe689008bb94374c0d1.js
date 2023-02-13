System.register(["__unresolved_0", "lie"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, _Promise, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_lie) {
      _req = _lie.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict"; // load the global object first:
        // - it should be better integrated in the system (unhandledRejection in node)
        // - the environment may have a custom Promise implementation (see zone.js)

        var ES6Promise = null;

        if (typeof Promise !== "undefined") {
          ES6Promise = Promise;
        } else {
          ES6Promise = require("lie");
        }
        /**
         * Let the user use/change some implementations.
         */


        module.exports = {
          Promise: ES6Promise
        }; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        _Promise = module.exports.Promise;
      }, () => ({
        'lie': _req
      }));
    }
  };
});
//# sourceMappingURL=8c2b1378cf9d9c7e1ae04fe689008bb94374c0d1.js.map