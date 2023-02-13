System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, _LOCAL_FILE_HEADER, _CENTRAL_FILE_HEADER, _CENTRAL_DIRECTORY_END, _ZIP64_CENTRAL_DIRECTORY_LOCATOR, _ZIP64_CENTRAL_DIRECTORY_END, _DATA_DESCRIPTOR, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        exports.LOCAL_FILE_HEADER = "PK\x03\x04";
        exports.CENTRAL_FILE_HEADER = "PK\x01\x02";
        exports.CENTRAL_DIRECTORY_END = "PK\x05\x06";
        exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x06\x07";
        exports.ZIP64_CENTRAL_DIRECTORY_END = "PK\x06\x06";
        exports.DATA_DESCRIPTOR = "PK\x07\x08"; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        _LOCAL_FILE_HEADER = module.exports.LOCAL_FILE_HEADER;
        _CENTRAL_FILE_HEADER = module.exports.CENTRAL_FILE_HEADER;
        _CENTRAL_DIRECTORY_END = module.exports.CENTRAL_DIRECTORY_END;
        _ZIP64_CENTRAL_DIRECTORY_LOCATOR = module.exports.ZIP64_CENTRAL_DIRECTORY_LOCATOR;
        _ZIP64_CENTRAL_DIRECTORY_END = module.exports.ZIP64_CENTRAL_DIRECTORY_END;
        _DATA_DESCRIPTOR = module.exports.DATA_DESCRIPTOR;
      }, {});
    }
  };
});
//# sourceMappingURL=79332105de76419b291a9916233078433bd87347.js.map