System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req1 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req2 = _unresolved_5.__cjsMetaURL;
    }, function (_unresolved_6) {
      _req3 = _unresolved_6.__cjsMetaURL;
    }, function (_unresolved_7) {
      _req4 = _unresolved_7.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var utils = require("../utils");

        var support = require("../support");

        var ArrayReader = require("./ArrayReader");

        var StringReader = require("./StringReader");

        var NodeBufferReader = require("./NodeBufferReader");

        var Uint8ArrayReader = require("./Uint8ArrayReader");
        /**
         * Create a reader adapted to the data.
         * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data to read.
         * @return {DataReader} the data reader.
         */


        module.exports = function (data) {
          var type = utils.getTypeOf(data);
          utils.checkSupport(type);

          if (type === "string" && !support.uint8array) {
            return new StringReader(data);
          }

          if (type === "nodebuffer") {
            return new NodeBufferReader(data);
          }

          if (support.uint8array) {
            return new Uint8ArrayReader(utils.transformTo("uint8array", data));
          }

          return new ArrayReader(utils.transformTo("array", data));
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        '../utils': _req,
        '../support': _req0,
        './ArrayReader': _req1,
        './StringReader': _req2,
        './NodeBufferReader': _req3,
        './Uint8ArrayReader': _req4
      }));
    }
  };
});
//# sourceMappingURL=ea0c0b8ab2710ca4414a3d0667f2d42c7a945a93.js.map