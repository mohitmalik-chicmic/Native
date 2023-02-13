System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _cjsExports, __cjsMetaURL;

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
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var external = require("./external");

        var DataWorker = require("./stream/DataWorker");

        var Crc32Probe = require("./stream/Crc32Probe");

        var DataLengthProbe = require("./stream/DataLengthProbe");
        /**
         * Represent a compressed object, with everything needed to decompress it.
         * @constructor
         * @param {number} compressedSize the size of the data compressed.
         * @param {number} uncompressedSize the size of the data after decompression.
         * @param {number} crc32 the crc32 of the decompressed file.
         * @param {object} compression the type of compression, see lib/compressions.js.
         * @param {String|ArrayBuffer|Uint8Array|Buffer} data the compressed data.
         */


        function CompressedObject(compressedSize, uncompressedSize, crc32, compression, data) {
          this.compressedSize = compressedSize;
          this.uncompressedSize = uncompressedSize;
          this.crc32 = crc32;
          this.compression = compression;
          this.compressedContent = data;
        }

        CompressedObject.prototype = {
          /**
           * Create a worker to get the uncompressed content.
           * @return {GenericWorker} the worker.
           */
          getContentWorker: function () {
            var worker = new DataWorker(external.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
            var that = this;
            worker.on("end", function () {
              if (this.streamInfo["data_length"] !== that.uncompressedSize) {
                throw new Error("Bug : uncompressed data size mismatch");
              }
            });
            return worker;
          },

          /**
           * Create a worker to get the compressed content.
           * @return {GenericWorker} the worker.
           */
          getCompressedWorker: function () {
            return new DataWorker(external.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
          }
        };
        /**
         * Chain the given worker with other workers to compress the content with the
         * given compression.
         * @param {GenericWorker} uncompressedWorker the worker to pipe.
         * @param {Object} compression the compression object.
         * @param {Object} compressionOptions the options to use when compressing.
         * @return {GenericWorker} the new worker compressing the content.
         */

        CompressedObject.createWorkerFrom = function (uncompressedWorker, compression, compressionOptions) {
          return uncompressedWorker.pipe(new Crc32Probe()).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
        };

        module.exports = CompressedObject; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './external': _req,
        './stream/DataWorker': _req0,
        './stream/Crc32Probe': _req1,
        './stream/DataLengthProbe': _req2
      }));
    }
  };
});
//# sourceMappingURL=af3d6ae0305706b460435154744d5bc17bfdb102.js.map