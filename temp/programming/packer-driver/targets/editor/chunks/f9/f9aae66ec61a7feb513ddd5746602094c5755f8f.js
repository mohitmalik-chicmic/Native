System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var utils = require("../utils");

        var GenericWorker = require("../stream/GenericWorker");
        /**
         * A worker that use a nodejs stream as source.
         * @constructor
         * @param {String} filename the name of the file entry for this stream.
         * @param {Readable} stream the nodejs stream.
         */


        function NodejsStreamInputAdapter(filename, stream) {
          GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
          this._upstreamEnded = false;

          this._bindStream(stream);
        }

        utils.inherits(NodejsStreamInputAdapter, GenericWorker);
        /**
         * Prepare the stream and bind the callbacks on it.
         * Do this ASAP on node 0.10 ! A lazy binding doesn't always work.
         * @param {Stream} stream the nodejs stream to use.
         */

        NodejsStreamInputAdapter.prototype._bindStream = function (stream) {
          var self = this;
          this._stream = stream;
          stream.pause();
          stream.on("data", function (chunk) {
            self.push({
              data: chunk,
              meta: {
                percent: 0
              }
            });
          }).on("error", function (e) {
            if (self.isPaused) {
              this.generatedError = e;
            } else {
              self.error(e);
            }
          }).on("end", function () {
            if (self.isPaused) {
              self._upstreamEnded = true;
            } else {
              self.end();
            }
          });
        };

        NodejsStreamInputAdapter.prototype.pause = function () {
          if (!GenericWorker.prototype.pause.call(this)) {
            return false;
          }

          this._stream.pause();

          return true;
        };

        NodejsStreamInputAdapter.prototype.resume = function () {
          if (!GenericWorker.prototype.resume.call(this)) {
            return false;
          }

          if (this._upstreamEnded) {
            this.end();
          } else {
            this._stream.resume();
          }

          return true;
        };

        module.exports = NodejsStreamInputAdapter; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        '../utils': _req,
        '../stream/GenericWorker': _req0
      }));
    }
  };
});
//# sourceMappingURL=f9aae66ec61a7feb513ddd5746602094c5755f8f.js.map