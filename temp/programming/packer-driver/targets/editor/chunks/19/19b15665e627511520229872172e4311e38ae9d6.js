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

        var GenericWorker = require("./GenericWorker");
        /**
         * A worker which calculate the total length of the data flowing through.
         * @constructor
         * @param {String} propName the name used to expose the length
         */


        function DataLengthProbe(propName) {
          GenericWorker.call(this, "DataLengthProbe for " + propName);
          this.propName = propName;
          this.withStreamInfo(propName, 0);
        }

        utils.inherits(DataLengthProbe, GenericWorker);
        /**
         * @see GenericWorker.processChunk
         */

        DataLengthProbe.prototype.processChunk = function (chunk) {
          if (chunk) {
            var length = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = length + chunk.data.length;
          }

          GenericWorker.prototype.processChunk.call(this, chunk);
        };

        module.exports = DataLengthProbe; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        '../utils': _req,
        './GenericWorker': _req0
      }));
    }
  };
});
//# sourceMappingURL=19b15665e627511520229872172e4311e38ae9d6.js.map