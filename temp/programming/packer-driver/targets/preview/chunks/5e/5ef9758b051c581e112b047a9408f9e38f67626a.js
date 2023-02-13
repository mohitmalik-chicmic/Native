System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, __cjsMetaURL;

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

        var ArrayReader = require("./ArrayReader");

        var utils = require("../utils");

        function Uint8ArrayReader(data) {
          ArrayReader.call(this, data);
        }

        utils.inherits(Uint8ArrayReader, ArrayReader);
        /**
         * @see DataReader.readData
         */

        Uint8ArrayReader.prototype.readData = function (size) {
          this.checkOffset(size);

          if (size === 0) {
            // in IE10, when using subarray(idx, idx), we get the array [0x00] instead of [].
            return new Uint8Array(0);
          }

          var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
          this.index += size;
          return result;
        };

        module.exports = Uint8ArrayReader; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './ArrayReader': _req,
        '../utils': _req0
      }));
    }
  };
});
//# sourceMappingURL=5ef9758b051c581e112b047a9408f9e38f67626a.js.map