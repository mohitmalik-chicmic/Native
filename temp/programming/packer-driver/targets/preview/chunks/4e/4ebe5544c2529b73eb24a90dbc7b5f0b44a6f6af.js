System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, _assign, _shrinkBuf, _setTyped, _Buf8, _Buf16, _Buf32, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        'use strict';

        var TYPED_OK = typeof Uint8Array !== 'undefined' && typeof Uint16Array !== 'undefined' && typeof Int32Array !== 'undefined';

        function _has(obj, key) {
          return Object.prototype.hasOwnProperty.call(obj, key);
        }

        exports.assign = function (obj
        /*from1, from2, from3, ...*/
        ) {
          var sources = Array.prototype.slice.call(arguments, 1);

          while (sources.length) {
            var source = sources.shift();

            if (!source) {
              continue;
            }

            if (typeof source !== 'object') {
              throw new TypeError(source + 'must be non-object');
            }

            for (var p in source) {
              if (_has(source, p)) {
                obj[p] = source[p];
              }
            }
          }

          return obj;
        }; // reduce buffer size, avoiding mem copy


        exports.shrinkBuf = function (buf, size) {
          if (buf.length === size) {
            return buf;
          }

          if (buf.subarray) {
            return buf.subarray(0, size);
          }

          buf.length = size;
          return buf;
        };

        var fnTyped = {
          arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
            if (src.subarray && dest.subarray) {
              dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
              return;
            } // Fallback to ordinary array


            for (var i = 0; i < len; i++) {
              dest[dest_offs + i] = src[src_offs + i];
            }
          },
          // Join array of chunks to single array.
          flattenChunks: function flattenChunks(chunks) {
            var i, l, len, pos, chunk, result; // calculate data length

            len = 0;

            for (i = 0, l = chunks.length; i < l; i++) {
              len += chunks[i].length;
            } // join chunks


            result = new Uint8Array(len);
            pos = 0;

            for (i = 0, l = chunks.length; i < l; i++) {
              chunk = chunks[i];
              result.set(chunk, pos);
              pos += chunk.length;
            }

            return result;
          }
        };
        var fnUntyped = {
          arraySet: function arraySet(dest, src, src_offs, len, dest_offs) {
            for (var i = 0; i < len; i++) {
              dest[dest_offs + i] = src[src_offs + i];
            }
          },
          // Join array of chunks to single array.
          flattenChunks: function flattenChunks(chunks) {
            return [].concat.apply([], chunks);
          }
        }; // Enable/Disable typed arrays use, for testing
        //

        exports.setTyped = function (on) {
          if (on) {
            exports.Buf8 = Uint8Array;
            exports.Buf16 = Uint16Array;
            exports.Buf32 = Int32Array;
            exports.assign(exports, fnTyped);
          } else {
            exports.Buf8 = Array;
            exports.Buf16 = Array;
            exports.Buf32 = Array;
            exports.assign(exports, fnUntyped);
          }
        };

        exports.setTyped(TYPED_OK); // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        _assign = module.exports.assign;
        _shrinkBuf = module.exports.shrinkBuf;
        _setTyped = module.exports.setTyped;
        _Buf8 = module.exports.Buf8;
        _Buf16 = module.exports.Buf16;
        _Buf32 = module.exports.Buf32;
      }, {});
    }
  };
});
//# sourceMappingURL=4ebe5544c2529b73eb24a90dbc7b5f0b44a6f6af.js.map