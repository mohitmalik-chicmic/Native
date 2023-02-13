System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, _STORE, _DEFLATE, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var GenericWorker = require("./stream/GenericWorker");

        exports.STORE = {
          magic: "\x00\x00",
          compressWorker: function () {
            return new GenericWorker("STORE compression");
          },
          uncompressWorker: function () {
            return new GenericWorker("STORE decompression");
          }
        };
        exports.DEFLATE = require("./flate"); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        _STORE = module.exports.STORE;
        _DEFLATE = module.exports.DEFLATE;
      }, () => ({
        './stream/GenericWorker': _req,
        './flate': _req0
      }));
    }
  };
});
//# sourceMappingURL=8befdf4906a6afcdb88f027bf9e574dc7f4df134.js.map