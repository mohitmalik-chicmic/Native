System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, _isNode, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        module.exports = {
          /**
           * True if this is running in Nodejs, will be undefined in a browser.
           * In a browser, browserify won't include this file and the whole module
           * will be resolved an empty object.
           */
          isNode: typeof Buffer !== "undefined",

          /**
           * Create a new nodejs Buffer from an existing content.
           * @param {Object} data the data to pass to the constructor.
           * @param {String} encoding the encoding to use.
           * @return {Buffer} a new Buffer.
           */
          newBufferFrom: function (data, encoding) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) {
              return Buffer.from(data, encoding);
            } else {
              if (typeof data === "number") {
                // Safeguard for old Node.js versions. On newer versions,
                // Buffer.from(number) / Buffer(number, encoding) already throw.
                throw new Error("The \"data\" argument must not be a number");
              }

              return new Buffer(data, encoding);
            }
          },

          /**
           * Create a new nodejs Buffer with the specified size.
           * @param {Integer} size the size of the buffer.
           * @return {Buffer} a new Buffer.
           */
          allocBuffer: function (size) {
            if (Buffer.alloc) {
              return Buffer.alloc(size);
            } else {
              var buf = new Buffer(size);
              buf.fill(0);
              return buf;
            }
          },

          /**
           * Find out if an object is a Buffer.
           * @param {Object} b the object to test.
           * @return {Boolean} true if the object is a Buffer, false otherwise.
           */
          isBuffer: function (b) {
            return Buffer.isBuffer(b);
          },
          isStream: function (obj) {
            return obj && typeof obj.on === "function" && typeof obj.pause === "function" && typeof obj.resume === "function";
          }
        }; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        _isNode = module.exports.isNode;
      }, {});
    }
  };
});
//# sourceMappingURL=1d0d51b28c8e999cf95d45443cdae74730a319a6.js.map