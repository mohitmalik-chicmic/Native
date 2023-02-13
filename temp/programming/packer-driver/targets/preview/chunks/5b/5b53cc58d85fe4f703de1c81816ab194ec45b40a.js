System.register(["__unresolved_0", "util"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_util) {
      _req = _util.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE

        /**
         * For Node.js, simply re-export the core `util.deprecate` function.
         */
        module.exports = require('util').deprecate; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        'util': _req
      }));
    }
  };
});
//# sourceMappingURL=5b53cc58d85fe4f703de1c81816ab194ec45b40a.js.map