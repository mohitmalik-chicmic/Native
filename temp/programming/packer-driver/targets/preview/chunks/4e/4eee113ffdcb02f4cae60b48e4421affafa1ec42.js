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

        var DataReader = require("./DataReader");

        var utils = require("../utils");

        function StringReader(data) {
          DataReader.call(this, data);
        }

        utils.inherits(StringReader, DataReader);
        /**
         * @see DataReader.byteAt
         */

        StringReader.prototype.byteAt = function (i) {
          return this.data.charCodeAt(this.zero + i);
        };
        /**
         * @see DataReader.lastIndexOfSignature
         */


        StringReader.prototype.lastIndexOfSignature = function (sig) {
          return this.data.lastIndexOf(sig) - this.zero;
        };
        /**
         * @see DataReader.readAndCheckSignature
         */


        StringReader.prototype.readAndCheckSignature = function (sig) {
          var data = this.readData(4);
          return sig === data;
        };
        /**
         * @see DataReader.readData
         */


        StringReader.prototype.readData = function (size) {
          this.checkOffset(size); // this will work because the constructor applied the "& 0xff" mask.

          var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
          this.index += size;
          return result;
        };

        module.exports = StringReader; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './DataReader': _req,
        '../utils': _req0
      }));
    }
  };
});
//# sourceMappingURL=4eee113ffdcb02f4cae60b48e4421affafa1ec42.js.map