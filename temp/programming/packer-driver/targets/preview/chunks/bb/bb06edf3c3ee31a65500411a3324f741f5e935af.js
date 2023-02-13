System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _req5, _cjsExports, __cjsMetaURL;

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
    }, function (_unresolved_7) {
      _req4 = _unresolved_7.__cjsMetaURL;
    }, function (_unresolved_8) {
      _req5 = _unresolved_8.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var utils = require("../utils");

        var ConvertWorker = require("./ConvertWorker");

        var GenericWorker = require("./GenericWorker");

        var base64 = require("../base64");

        var support = require("../support");

        var external = require("../external");

        var NodejsStreamOutputAdapter = null;

        if (support.nodestream) {
          try {
            NodejsStreamOutputAdapter = require("../nodejs/NodejsStreamOutputAdapter");
          } catch (e) {// ignore
          }
        }
        /**
         * Apply the final transformation of the data. If the user wants a Blob for
         * example, it's easier to work with an U8intArray and finally do the
         * ArrayBuffer/Blob conversion.
         * @param {String} type the name of the final type
         * @param {String|Uint8Array|Buffer} content the content to transform
         * @param {String} mimeType the mime type of the content, if applicable.
         * @return {String|Uint8Array|ArrayBuffer|Buffer|Blob} the content in the right format.
         */


        function transformZipOutput(type, content, mimeType) {
          switch (type) {
            case "blob":
              return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);

            case "base64":
              return base64.encode(content);

            default:
              return utils.transformTo(type, content);
          }
        }
        /**
         * Concatenate an array of data of the given type.
         * @param {String} type the type of the data in the given array.
         * @param {Array} dataArray the array containing the data chunks to concatenate
         * @return {String|Uint8Array|Buffer} the concatenated data
         * @throws Error if the asked type is unsupported
         */


        function concat(type, dataArray) {
          var i,
              index = 0,
              res = null,
              totalLength = 0;

          for (i = 0; i < dataArray.length; i++) {
            totalLength += dataArray[i].length;
          }

          switch (type) {
            case "string":
              return dataArray.join("");

            case "array":
              return Array.prototype.concat.apply([], dataArray);

            case "uint8array":
              res = new Uint8Array(totalLength);

              for (i = 0; i < dataArray.length; i++) {
                res.set(dataArray[i], index);
                index += dataArray[i].length;
              }

              return res;

            case "nodebuffer":
              return Buffer.concat(dataArray);

            default:
              throw new Error("concat : unsupported type '" + type + "'");
          }
        }
        /**
         * Listen a StreamHelper, accumulate its content and concatenate it into a
         * complete block.
         * @param {StreamHelper} helper the helper to use.
         * @param {Function} updateCallback a callback called on each update. Called
         * with one arg :
         * - the metadata linked to the update received.
         * @return Promise the promise for the accumulation.
         */


        function _accumulate(helper, updateCallback) {
          return new external.Promise(function (resolve, reject) {
            var dataArray = [];
            var chunkType = helper._internalType,
                resultType = helper._outputType,
                mimeType = helper._mimeType;
            helper.on("data", function (data, meta) {
              dataArray.push(data);

              if (updateCallback) {
                updateCallback(meta);
              }
            }).on("error", function (err) {
              dataArray = [];
              reject(err);
            }).on("end", function () {
              try {
                var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
                resolve(result);
              } catch (e) {
                reject(e);
              }

              dataArray = [];
            }).resume();
          });
        }
        /**
         * An helper to easily use workers outside of JSZip.
         * @constructor
         * @param {Worker} worker the worker to wrap
         * @param {String} outputType the type of data expected by the use
         * @param {String} mimeType the mime type of the content, if applicable.
         */


        function StreamHelper(worker, outputType, mimeType) {
          var internalType = outputType;

          switch (outputType) {
            case "blob":
            case "arraybuffer":
              internalType = "uint8array";
              break;

            case "base64":
              internalType = "string";
              break;
          }

          try {
            // the type used internally
            this._internalType = internalType; // the type used to output results

            this._outputType = outputType; // the mime type

            this._mimeType = mimeType;
            utils.checkSupport(internalType);
            this._worker = worker.pipe(new ConvertWorker(internalType)); // the last workers can be rewired without issues but we need to
            // prevent any updates on previous workers.

            worker.lock();
          } catch (e) {
            this._worker = new GenericWorker("error");

            this._worker.error(e);
          }
        }

        StreamHelper.prototype = {
          /**
           * Listen a StreamHelper, accumulate its content and concatenate it into a
           * complete block.
           * @param {Function} updateCb the update callback.
           * @return Promise the promise for the accumulation.
           */
          accumulate: function accumulate(updateCb) {
            return _accumulate(this, updateCb);
          },

          /**
           * Add a listener on an event triggered on a stream.
           * @param {String} evt the name of the event
           * @param {Function} fn the listener
           * @return {StreamHelper} the current helper.
           */
          on: function on(evt, fn) {
            var self = this;

            if (evt === "data") {
              this._worker.on(evt, function (chunk) {
                fn.call(self, chunk.data, chunk.meta);
              });
            } else {
              this._worker.on(evt, function () {
                utils.delay(fn, arguments, self);
              });
            }

            return this;
          },

          /**
           * Resume the flow of chunks.
           * @return {StreamHelper} the current helper.
           */
          resume: function resume() {
            utils.delay(this._worker.resume, [], this._worker);
            return this;
          },

          /**
           * Pause the flow of chunks.
           * @return {StreamHelper} the current helper.
           */
          pause: function pause() {
            this._worker.pause();

            return this;
          },

          /**
           * Return a nodejs stream for this helper.
           * @param {Function} updateCb the update callback.
           * @return {NodejsStreamOutputAdapter} the nodejs stream.
           */
          toNodejsStream: function toNodejsStream(updateCb) {
            utils.checkSupport("nodestream");

            if (this._outputType !== "nodebuffer") {
              // an object stream containing blob/arraybuffer/uint8array/string
              // is strange and I don't know if it would be useful.
              // I you find this comment and have a good usecase, please open a
              // bug report !
              throw new Error(this._outputType + " is not supported by this method");
            }

            return new NodejsStreamOutputAdapter(this, {
              objectMode: this._outputType !== "nodebuffer"
            }, updateCb);
          }
        };
        module.exports = StreamHelper; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        '../utils': _req,
        './ConvertWorker': _req0,
        './GenericWorker': _req1,
        '../base64': _req2,
        '../support': _req3,
        '../external': _req4,
        '../nodejs/NodejsStreamOutputAdapter': _req5
      }));
    }
  };
});
//# sourceMappingURL=bb06edf3c3ee31a65500411a3324f741f5e935af.js.map