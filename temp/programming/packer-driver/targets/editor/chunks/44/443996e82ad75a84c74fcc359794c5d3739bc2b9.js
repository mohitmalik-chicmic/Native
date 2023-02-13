System.register(["__unresolved_0", "pako", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, _magic, _compressWorker, _uncompressWorker, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_pako) {
      _req = _pako.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req0 = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req1 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";

        var pako = require("pako");

        var utils = require("./utils");

        var GenericWorker = require("./stream/GenericWorker");

        var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
        exports.magic = "\x08\x00";
        /**
         * Create a worker that uses pako to inflate/deflate.
         * @constructor
         * @param {String} action the name of the pako function to call : either "Deflate" or "Inflate".
         * @param {Object} options the options to use when (de)compressing.
         */

        function FlateWorker(action, options) {
          GenericWorker.call(this, "FlateWorker/" + action);
          this._pako = null;
          this._pakoAction = action;
          this._pakoOptions = options; // the `meta` object from the last chunk received
          // this allow this worker to pass around metadata

          this.meta = {};
        }

        utils.inherits(FlateWorker, GenericWorker);
        /**
         * @see GenericWorker.processChunk
         */

        FlateWorker.prototype.processChunk = function (chunk) {
          this.meta = chunk.meta;

          if (this._pako === null) {
            this._createPako();
          }

          this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
        };
        /**
         * @see GenericWorker.flush
         */


        FlateWorker.prototype.flush = function () {
          GenericWorker.prototype.flush.call(this);

          if (this._pako === null) {
            this._createPako();
          }

          this._pako.push([], true);
        };
        /**
         * @see GenericWorker.cleanUp
         */


        FlateWorker.prototype.cleanUp = function () {
          GenericWorker.prototype.cleanUp.call(this);
          this._pako = null;
        };
        /**
         * Create the _pako object.
         * TODO: lazy-loading this object isn't the best solution but it's the
         * quickest. The best solution is to lazy-load the worker list. See also the
         * issue #446.
         */


        FlateWorker.prototype._createPako = function () {
          this._pako = new pako[this._pakoAction]({
            raw: true,
            level: this._pakoOptions.level || -1 // default compression

          });
          var self = this;

          this._pako.onData = function (data) {
            self.push({
              data: data,
              meta: self.meta
            });
          };
        };

        exports.compressWorker = function (compressionOptions) {
          return new FlateWorker("Deflate", compressionOptions);
        };

        exports.uncompressWorker = function () {
          return new FlateWorker("Inflate", {});
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _magic = module.exports.magic;
        _compressWorker = module.exports.compressWorker;
        _uncompressWorker = module.exports.uncompressWorker;
      }, () => ({
        'pako': _req,
        './utils': _req0,
        './stream/GenericWorker': _req1
      }));
    }
  };
});
//# sourceMappingURL=443996e82ad75a84c74fcc359794c5d3739bc2b9.js.map