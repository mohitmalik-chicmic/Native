System.register(["__unresolved_0", "readable-stream", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_readableStream) {
      _req = _readableStream.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req0 = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var Readable = require("readable-stream").Readable;

        var utils = require("../utils");

        utils.inherits(NodejsStreamOutputAdapter, Readable);
        /**
        * A nodejs stream using a worker as source.
        * @see the SourceWrapper in http://nodejs.org/api/stream.html
        * @constructor
        * @param {StreamHelper} helper the helper wrapping the worker
        * @param {Object} options the nodejs stream options
        * @param {Function} updateCb the update callback.
        */

        function NodejsStreamOutputAdapter(helper, options, updateCb) {
          Readable.call(this, options);
          this._helper = helper;
          var self = this;
          helper.on("data", function (data, meta) {
            if (!self.push(data)) {
              self._helper.pause();
            }

            if (updateCb) {
              updateCb(meta);
            }
          }).on("error", function (e) {
            self.emit("error", e);
          }).on("end", function () {
            self.push(null);
          });
        }

        NodejsStreamOutputAdapter.prototype._read = function () {
          this._helper.resume();
        };

        module.exports = NodejsStreamOutputAdapter; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        'readable-stream': _req,
        '../utils': _req0
      }));
    }
  };
});
//# sourceMappingURL=2735dce519c95b00e55a1ac6d91cc2d8d13c450c.js.map