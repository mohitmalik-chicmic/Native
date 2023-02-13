System.register(["__unresolved_0", "readable-stream"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, _base64, _array, _string, _arraybuffer, _nodebuffer, _uint8array, _blob, _nodestream, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_readableStream) {
      _req = _readableStream.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        exports.base64 = true;
        exports.array = true;
        exports.string = true;
        exports.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
        exports.nodebuffer = typeof Buffer !== "undefined"; // contains true if JSZip can read/generate Uint8Array, false otherwise.

        exports.uint8array = typeof Uint8Array !== "undefined";

        if (typeof ArrayBuffer === "undefined") {
          exports.blob = false;
        } else {
          var buffer = new ArrayBuffer(0);

          try {
            exports.blob = new Blob([buffer], {
              type: "application/zip"
            }).size === 0;
          } catch (e) {
            try {
              var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
              var builder = new Builder();
              builder.append(buffer);
              exports.blob = builder.getBlob("application/zip").size === 0;
            } catch (e) {
              exports.blob = false;
            }
          }
        }

        try {
          exports.nodestream = !!require("readable-stream").Readable;
        } catch (e) {
          exports.nodestream = false;
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _base64 = module.exports.base64;
        _array = module.exports.array;
        _string = module.exports.string;
        _arraybuffer = module.exports.arraybuffer;
        _nodebuffer = module.exports.nodebuffer;
        _uint8array = module.exports.uint8array;
        _blob = module.exports.blob;
        _nodestream = module.exports.nodestream;
      }, () => ({
        'readable-stream': _req
      }));
    }
  };
});
//# sourceMappingURL=310894d807c6ddcb1bb089dcad74ac8326c03506.js.map