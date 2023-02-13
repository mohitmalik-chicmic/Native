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
        // Top level file is just a mixin of submodules & constants
        'use strict';

        var assign = require('./lib/utils/common').assign;

        var deflate = require('./lib/deflate');

        var inflate = require('./lib/inflate');

        var constants = require('./lib/zlib/constants');

        var pako = {};
        assign(pako, deflate, inflate, constants);
        module.exports = pako; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './lib/utils/common': _req,
        './lib/deflate': _req0,
        './lib/inflate': _req1,
        './lib/zlib/constants': _req2
      }));
    }
  };
});
//# sourceMappingURL=83d9ceca2bc8de970a5298fc8c88e4a26192b7b1.js.map