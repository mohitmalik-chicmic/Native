System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        'use strict'; // Note: we can't get significant speed boost here.
        // So write code to minimize size - no pregenerated tables
        // and array tools dependencies.
        // (C) 1995-2013 Jean-loup Gailly and Mark Adler
        // (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
        //
        // This software is provided 'as-is', without any express or implied
        // warranty. In no event will the authors be held liable for any damages
        // arising from the use of this software.
        //
        // Permission is granted to anyone to use this software for any purpose,
        // including commercial applications, and to alter it and redistribute it
        // freely, subject to the following restrictions:
        //
        // 1. The origin of this software must not be misrepresented; you must not
        //   claim that you wrote the original software. If you use this software
        //   in a product, an acknowledgment in the product documentation would be
        //   appreciated but is not required.
        // 2. Altered source versions must be plainly marked as such, and must not be
        //   misrepresented as being the original software.
        // 3. This notice may not be removed or altered from any source distribution.
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
          crc ^= -1;

          for (var i = pos; i < end; i++) {
            crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 0xFF];
          }

          return crc ^ -1; // >>> 0;
        }

        module.exports = crc32; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=8ee86914c366576a4a490f0ae8335277b5a29c5e.js.map