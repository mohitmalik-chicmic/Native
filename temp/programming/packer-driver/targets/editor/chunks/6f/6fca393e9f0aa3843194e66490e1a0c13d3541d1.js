System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var utils = require("./utils");
        /**
         * The following functions come from pako, from pako/lib/zlib/crc32.js
         * released under the MIT license, see pako https://github.com/nodeca/pako/
         */
        // Use ordinary array, since untyped makes no boost here


        function makeTable() {
          var c,
              table = [];

          for (var n = 0; n < 256; n++) {
            c = n;

            for (var k = 0; k < 8; k++) {
              c = c & 1 ? 0xEDB88320 ^ c >>> 1 : c >>> 1;
            }

            table[n] = c;
          }

          return table;
        } // Create table on load. Just 255 signed longs. Not a problem.


        var crcTable = makeTable();

        function crc32(crc, buf, len, pos) {
          var t = crcTable,
              end = pos + len;
          crc = crc ^ -1;

          for (var i = pos; i < end; i++) {
            crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 0xFF];
          }

          return crc ^ -1; // >>> 0;
        } // That's all for the pako functions.

        /**
         * Compute the crc32 of a string.
         * This is almost the same as the function crc32, but for strings. Using the
         * same function for the two use cases leads to horrible performances.
         * @param {Number} crc the starting value of the crc.
         * @param {String} str the string to use.
         * @param {Number} len the length of the string.
         * @param {Number} pos the starting position for the crc32 computation.
         * @return {Number} the computed crc32.
         */


        function crc32str(crc, str, len, pos) {
          var t = crcTable,
              end = pos + len;
          crc = crc ^ -1;

          for (var i = pos; i < end; i++) {
            crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 0xFF];
          }

          return crc ^ -1; // >>> 0;
        }

        module.exports = function crc32wrapper(input, crc) {
          if (typeof input === "undefined" || !input.length) {
            return 0;
          }

          var isArray = utils.getTypeOf(input) !== "string";

          if (isArray) {
            return crc32(crc | 0, input, input.length, 0);
          } else {
            return crc32str(crc | 0, input, input.length, 0);
          }
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './utils': _req
      }));
    }
  };
});
//# sourceMappingURL=6fca393e9f0aa3843194e66490e1a0c13d3541d1.js.map