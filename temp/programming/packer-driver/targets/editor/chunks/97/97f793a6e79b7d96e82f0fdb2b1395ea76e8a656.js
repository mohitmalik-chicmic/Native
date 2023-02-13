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

        var Uint8ArrayReader = require("./Uint8ArrayReader");

        var utils = require("../utils");

        function NodeBufferReader(data) {
          Uint8ArrayReader.call(this, data);
        }

        utils.inherits(NodeBufferReader, Uint8ArrayReader);
        /**
         * @see DataReader.readData
         */

        NodeBufferReader.prototype.readData = function (size) {
          this.checkOffset(size);
          var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
          this.index += size;
          return result;
        };

        module.exports = NodeBufferReader; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './Uint8ArrayReader': _req,
        '../utils': _req0
      }));
    }
  };
});
//# sourceMappingURL=97f793a6e79b7d96e82f0fdb2b1395ea76e8a656.js.map