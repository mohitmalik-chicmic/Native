System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, _nextTick, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        'use strict';

        if (typeof process === 'undefined' || !process.version || process.version.indexOf('v0.') === 0 || process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
          module.exports = {
            nextTick: nextTick
          };
        } else {
          module.exports = process;
        }

        function nextTick(fn, arg1, arg2, arg3) {
          if (typeof fn !== 'function') {
            throw new TypeError('"callback" argument must be a function');
          }

          var len = arguments.length;
          var args, i;

          switch (len) {
            case 0:
            case 1:
              return process.nextTick(fn);

            case 2:
              return process.nextTick(function afterTickOne() {
                fn.call(null, arg1);
              });

            case 3:
              return process.nextTick(function afterTickTwo() {
                fn.call(null, arg1, arg2);
              });

            case 4:
              return process.nextTick(function afterTickThree() {
                fn.call(null, arg1, arg2, arg3);
              });

            default:
              args = new Array(len - 1);
              i = 0;

              while (i < args.length) {
                args[i++] = arguments[i];
              }

              return process.nextTick(function afterTick() {
                fn.apply(null, args);
              });
          }
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _nextTick = module.exports.nextTick;
      }, {});
    }
  };
});
//# sourceMappingURL=8b4c4cb213bad38e073dff038d513647aba74e47.js.map