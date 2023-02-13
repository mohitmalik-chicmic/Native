System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _cjsExports, __cjsMetaURL;

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
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";
        /**
         * Representation a of zip file in js
         * @constructor
         */

        function JSZip() {
          // if this constructor is used without `new`, it adds `new` before itself:
          if (!(this instanceof JSZip)) {
            return new JSZip();
          }

          if (arguments.length) {
            throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          } // object containing the files :
          // {
          //   "folder/" : {...},
          //   "folder/data.txt" : {...}
          // }
          // NOTE: we use a null prototype because we do not
          // want filenames like "toString" coming from a zip file
          // to overwrite methods and attributes in a normal Object.


          this.files = Object.create(null);
          this.comment = null; // Where we are in the hierarchy

          this.root = "";

          this.clone = function () {
            var newObj = new JSZip();

            for (var i in this) {
              if (typeof this[i] !== "function") {
                newObj[i] = this[i];
              }
            }

            return newObj;
          };
        }

        JSZip.prototype = require("./object");
        JSZip.prototype.loadAsync = require("./load");
        JSZip.support = require("./support");
        JSZip.defaults = require("./defaults"); // TODO find a better way to handle this version,
        // a require('package.json').version doesn't work with webpack, see #327

        JSZip.version = "3.10.1";

        JSZip.loadAsync = function (content, options) {
          return new JSZip().loadAsync(content, options);
        };

        JSZip.external = require("./external");
        module.exports = JSZip; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './object': _req,
        './load': _req0,
        './support': _req1,
        './defaults': _req2,
        './external': _req3
      }));
    }
  };
});
//# sourceMappingURL=e0a484dfd51b144131f405bc57b9d0f74b1dedcd.js.map