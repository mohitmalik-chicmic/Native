System.register(["__unresolved_0", "buffer"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, _isArray, _isBoolean, _isNull, _isNullOrUndefined, _isNumber, _isString, _isSymbol, _isUndefined, _isRegExp, _isObject, _isDate, _isError, _isFunction, _isPrimitive, _isBuffer, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_buffer) {
      _req = _buffer.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        // Copyright Joyent, Inc. and other Node contributors.
        //
        // Permission is hereby granted, free of charge, to any person obtaining a
        // copy of this software and associated documentation files (the
        // "Software"), to deal in the Software without restriction, including
        // without limitation the rights to use, copy, modify, merge, publish,
        // distribute, sublicense, and/or sell copies of the Software, and to permit
        // persons to whom the Software is furnished to do so, subject to the
        // following conditions:
        //
        // The above copyright notice and this permission notice shall be included
        // in all copies or substantial portions of the Software.
        //
        // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        // OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        // MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
        // NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
        // DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
        // OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
        // USE OR OTHER DEALINGS IN THE SOFTWARE.
        // NOTE: These type checking functions intentionally don't use `instanceof`
        // because it is fragile and can be easily faked with `Object.create()`.
        function isArray(arg) {
          if (Array.isArray) {
            return Array.isArray(arg);
          }

          return objectToString(arg) === '[object Array]';
        }

        exports.isArray = isArray;

        function isBoolean(arg) {
          return typeof arg === 'boolean';
        }

        exports.isBoolean = isBoolean;

        function isNull(arg) {
          return arg === null;
        }

        exports.isNull = isNull;

        function isNullOrUndefined(arg) {
          return arg == null;
        }

        exports.isNullOrUndefined = isNullOrUndefined;

        function isNumber(arg) {
          return typeof arg === 'number';
        }

        exports.isNumber = isNumber;

        function isString(arg) {
          return typeof arg === 'string';
        }

        exports.isString = isString;

        function isSymbol(arg) {
          return typeof arg === 'symbol';
        }

        exports.isSymbol = isSymbol;

        function isUndefined(arg) {
          return arg === void 0;
        }

        exports.isUndefined = isUndefined;

        function isRegExp(re) {
          return objectToString(re) === '[object RegExp]';
        }

        exports.isRegExp = isRegExp;

        function isObject(arg) {
          return typeof arg === 'object' && arg !== null;
        }

        exports.isObject = isObject;

        function isDate(d) {
          return objectToString(d) === '[object Date]';
        }

        exports.isDate = isDate;

        function isError(e) {
          return objectToString(e) === '[object Error]' || e instanceof Error;
        }

        exports.isError = isError;

        function isFunction(arg) {
          return typeof arg === 'function';
        }

        exports.isFunction = isFunction;

        function isPrimitive(arg) {
          return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
          typeof arg === 'undefined';
        }

        exports.isPrimitive = isPrimitive;
        exports.isBuffer = require('buffer').Buffer.isBuffer;

        function objectToString(o) {
          return Object.prototype.toString.call(o);
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _isArray = module.exports.isArray;
        _isBoolean = module.exports.isBoolean;
        _isNull = module.exports.isNull;
        _isNullOrUndefined = module.exports.isNullOrUndefined;
        _isNumber = module.exports.isNumber;
        _isString = module.exports.isString;
        _isSymbol = module.exports.isSymbol;
        _isUndefined = module.exports.isUndefined;
        _isRegExp = module.exports.isRegExp;
        _isObject = module.exports.isObject;
        _isDate = module.exports.isDate;
        _isError = module.exports.isError;
        _isFunction = module.exports.isFunction;
        _isPrimitive = module.exports.isPrimitive;
        _isBuffer = module.exports.isBuffer;
      }, () => ({
        'buffer': _req
      }));
    }
  };
});
//# sourceMappingURL=8cc99908d6ba3917e6771422dd337058c483fd8f.js.map