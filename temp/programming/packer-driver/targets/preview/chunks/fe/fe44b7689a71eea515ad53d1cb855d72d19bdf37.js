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

        function ArrayReader(data) {
          DataReader.call(this, data);

          for (var i = 0; i < this.data.length; i++) {
            data[i] = data[i] & 0xFF;
          }
        }

        utils.inherits(ArrayReader, DataReader);
        /**
         * @see DataReader.byteAt
         */

        ArrayReader.prototype.byteAt = function (i) {
          return this.data[this.zero + i];
        };
        /**
         * @see DataReader.lastIndexOfSignature
         */


        ArrayReader.prototype.lastIndexOfSignature = function (sig) {
          var sig0 = sig.charCodeAt(0),
              sig1 = sig.charCodeAt(1),
              sig2 = sig.charCodeAt(2),
              sig3 = sig.charCodeAt(3);

          for (var i = this.length - 4; i >= 0; --i) {
            if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
              return i - this.zero;
            }
          }

          return -1;
        };
        /**
         * @see DataReader.readAndCheckSignature
         */


        ArrayReader.prototype.readAndCheckSignature = function (sig) {
          var sig0 = sig.charCodeAt(0),
              sig1 = sig.charCodeAt(1),
              sig2 = sig.charCodeAt(2),
              sig3 = sig.charCodeAt(3),
              data = this.readData(4);
          return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
        };
        /**
         * @see DataReader.readData
         */


        ArrayReader.prototype.readData = function (size) {
          this.checkOffset(size);

          if (size === 0) {
            return [];
          }

          var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
          this.index += size;
          return result;
        };

        module.exports = ArrayReader; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './DataReader': _req,
        '../utils': _req0
      }));
    }
  };
});
//# sourceMappingURL=fe44b7689a71eea515ad53d1cb855d72d19bdf37.js.map