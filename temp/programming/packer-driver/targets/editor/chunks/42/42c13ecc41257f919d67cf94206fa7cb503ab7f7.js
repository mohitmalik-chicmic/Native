System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req1 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req2 = _unresolved_5.__cjsMetaURL;
    }, function (_unresolved_6) {
      _req3 = _unresolved_6.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var StreamHelper = require("./stream/StreamHelper");

        var DataWorker = require("./stream/DataWorker");

        var utf8 = require("./utf8");

        var CompressedObject = require("./compressedObject");

        var GenericWorker = require("./stream/GenericWorker");
        /**
         * A simple object representing a file in the zip file.
         * @constructor
         * @param {string} name the name of the file
         * @param {String|ArrayBuffer|Uint8Array|Buffer} data the data
         * @param {Object} options the options of the file
         */


        var ZipObject = function (name, data, options) {
          this.name = name;
          this.dir = options.dir;
          this.date = options.date;
          this.comment = options.comment;
          this.unixPermissions = options.unixPermissions;
          this.dosPermissions = options.dosPermissions;
          this._data = data;
          this._dataBinary = options.binary; // keep only the compression

          this.options = {
            compression: options.compression,
            compressionOptions: options.compressionOptions
          };
        };

        ZipObject.prototype = {
          /**
           * Create an internal stream for the content of this object.
           * @param {String} type the type of each chunk.
           * @return StreamHelper the stream.
           */
          internalStream: function (type) {
            var result = null,
                outputType = "string";

            try {
              if (!type) {
                throw new Error("No output type specified.");
              }

              outputType = type.toLowerCase();
              var askUnicodeString = outputType === "string" || outputType === "text";

              if (outputType === "binarystring" || outputType === "text") {
                outputType = "string";
              }

              result = this._decompressWorker();
              var isUnicodeString = !this._dataBinary;

              if (isUnicodeString && !askUnicodeString) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
              }

              if (!isUnicodeString && askUnicodeString) {
                result = result.pipe(new utf8.Utf8DecodeWorker());
              }
            } catch (e) {
              result = new GenericWorker("error");
              result.error(e);
            }

            return new StreamHelper(result, outputType, "");
          },

          /**
           * Prepare the content in the asked type.
           * @param {String} type the type of the result.
           * @param {Function} onUpdate a function to call on each internal update.
           * @return Promise the promise of the result.
           */
          async: function (type, onUpdate) {
            return this.internalStream(type).accumulate(onUpdate);
          },

          /**
           * Prepare the content as a nodejs stream.
           * @param {String} type the type of each chunk.
           * @param {Function} onUpdate a function to call on each internal update.
           * @return Stream the stream.
           */
          nodeStream: function (type, onUpdate) {
            return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
          },

          /**
           * Return a worker for the compressed content.
           * @private
           * @param {Object} compression the compression object to use.
           * @param {Object} compressionOptions the options to use when compressing.
           * @return Worker the worker.
           */
          _compressWorker: function (compression, compressionOptions) {
            if (this._data instanceof CompressedObject && this._data.compression.magic === compression.magic) {
              return this._data.getCompressedWorker();
            } else {
              var result = this._decompressWorker();

              if (!this._dataBinary) {
                result = result.pipe(new utf8.Utf8EncodeWorker());
              }

              return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
            }
          },

          /**
           * Return a worker for the decompressed content.
           * @private
           * @return Worker the worker.
           */
          _decompressWorker: function () {
            if (this._data instanceof CompressedObject) {
              return this._data.getContentWorker();
            } else if (this._data instanceof GenericWorker) {
              return this._data;
            } else {
              return new DataWorker(this._data);
            }
          }
        };
        var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];

        var removedFn = function () {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        };

        for (var i = 0; i < removedMethods.length; i++) {
          ZipObject.prototype[removedMethods[i]] = removedFn;
        }

        module.exports = ZipObject; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './stream/StreamHelper': _req,
        './stream/DataWorker': _req0,
        './utf8': _req1,
        './compressedObject': _req2,
        './stream/GenericWorker': _req3
      }));
    }
  };
});
//# sourceMappingURL=42c13ecc41257f919d67cf94206fa7cb503ab7f7.js.map