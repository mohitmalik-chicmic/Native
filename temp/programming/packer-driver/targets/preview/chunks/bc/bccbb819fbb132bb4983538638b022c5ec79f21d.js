System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, __cjsMetaURL;

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
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var GenericWorker = require("./GenericWorker");

        var crc32 = require("../crc32");

        var utils = require("../utils");
        /**
         * A worker which calculate the crc32 of the data flowing through.
         * @constructor
         */


        function Crc32Probe() {
          GenericWorker.call(this, "Crc32Probe");
          this.withStreamInfo("crc32", 0);
        }

        utils.inherits(Crc32Probe, GenericWorker);
        /**
         * @see GenericWorker.processChunk
         */

        Crc32Probe.prototype.processChunk = function (chunk) {
          this.streamInfo.crc32 = crc32(chunk.data, this.streamInfo.crc32 || 0);
          this.push(chunk);
        };

        module.exports = Crc32Probe; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './GenericWorker': _req,
        '../crc32': _req0,
        '../utils': _req1
      }));
    }
  };
});
//# sourceMappingURL=bccbb819fbb132bb4983538638b022c5ec79f21d.js.map