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
        'use strict'; // Note: adler32 takes 12% for level 0 and 2% for level 6.
        // It isn't worth it to make additional optimizations as in original.
        // Small size is preferable.
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

        function adler32(adler, buf, len, pos) {
          var s1 = adler & 0xffff | 0,
              s2 = adler >>> 16 & 0xffff | 0,
              n = 0;

          while (len !== 0) {
            // Set limit ~ twice less than 5552, to keep
            // s2 in 31-bits, because we force signed ints.
            // in other case %= will fail.
            n = len > 2000 ? 2000 : len;
            len -= n;

            do {
              s1 = s1 + buf[pos++] | 0;
              s2 = s2 + s1 | 0;
            } while (--n);

            s1 %= 65521;
            s2 %= 65521;
          }

          return s1 | s2 << 16 | 0;
        }

        module.exports = adler32; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=d30e4ef0f8f9ca678372c230425b21accaaa298e.js.map