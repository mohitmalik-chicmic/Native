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

        var GenericWorker = require("./GenericWorker");

        var utils = require("../utils");
        /**
         * A worker which convert chunks to a specified type.
         * @constructor
         * @param {String} destType the destination type.
         */


        function ConvertWorker(destType) {
          GenericWorker.call(this, "ConvertWorker to " + destType);
          this.destType = destType;
        }

        utils.inherits(ConvertWorker, GenericWorker);
        /**
         * @see GenericWorker.processChunk
         */

        ConvertWorker.prototype.processChunk = function (chunk) {
          this.push({
            data: utils.transformTo(this.destType, chunk.data),
            meta: chunk.meta
          });
        };

        module.exports = ConvertWorker; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './GenericWorker': _req,
        '../utils': _req0
      }));
    }
  };
});
//# sourceMappingURL=5a75181fe013f259a91457280c13372ab5106c9a.js.map