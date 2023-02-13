System.register(["__unresolved_0", "safe-buffer", "util"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_safeBuffer) {
      _req = _safeBuffer.__cjsMetaURL;
    }, function (_util) {
      _req0 = _util.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        'use strict';

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        var Buffer = require('safe-buffer').Buffer;

        var util = require('util');

        function copyBuffer(src, target, offset) {
          src.copy(target, offset);
        }

        module.exports = function () {
          function BufferList() {
            _classCallCheck(this, BufferList);

            this.head = null;
            this.tail = null;
            this.length = 0;
          }

          BufferList.prototype.push = function push(v) {
            var entry = {
              data: v,
              next: null
            };
            if (this.length > 0) this.tail.next = entry;else this.head = entry;
            this.tail = entry;
            ++this.length;
          };

          BufferList.prototype.unshift = function unshift(v) {
            var entry = {
              data: v,
              next: this.head
            };
            if (this.length === 0) this.tail = entry;
            this.head = entry;
            ++this.length;
          };

          BufferList.prototype.shift = function shift() {
            if (this.length === 0) return;
            var ret = this.head.data;
            if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
            --this.length;
            return ret;
          };

          BufferList.prototype.clear = function clear() {
            this.head = this.tail = null;
            this.length = 0;
          };

          BufferList.prototype.join = function join(s) {
            if (this.length === 0) return '';
            var p = this.head;
            var ret = '' + p.data;

            while (p = p.next) {
              ret += s + p.data;
            }

            return ret;
          };

          BufferList.prototype.concat = function concat(n) {
            if (this.length === 0) return Buffer.alloc(0);
            if (this.length === 1) return this.head.data;
            var ret = Buffer.allocUnsafe(n >>> 0);
            var p = this.head;
            var i = 0;

            while (p) {
              copyBuffer(p.data, ret, i);
              i += p.data.length;
              p = p.next;
            }

            return ret;
          };

          return BufferList;
        }();

        if (util && util.inspect && util.inspect.custom) {
          module.exports.prototype[util.inspect.custom] = function () {
            var obj = util.inspect({
              length: this.length
            });
            return this.constructor.name + ' ' + obj;
          };
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        'safe-buffer': _req,
        'util': _req0
      }));
    }
  };
});
//# sourceMappingURL=69c49452c26032dca8475ac03cdc74cd883f435f.js.map