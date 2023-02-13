System.register(["__unresolved_0", "process-nextick-args", "core-util-is", "inherits", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_processNextickArgs) {
      _req = _processNextickArgs.__cjsMetaURL;
    }, function (_coreUtilIs) {
      _req0 = _coreUtilIs.__cjsMetaURL;
    }, function (_inherits) {
      _req1 = _inherits.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req2 = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req3 = _unresolved_3.__cjsMetaURL;
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
        // a duplex stream is just a stream that is both readable and writable.
        // Since JS doesn't have multiple prototypal inheritance, this class
        // prototypally inherits from Readable, and then parasitically from
        // Writable.
        'use strict';
        /*<replacement>*/

        var pna = require('process-nextick-args');
        /*</replacement>*/

        /*<replacement>*/


        var objectKeys = Object.keys || function (obj) {
          var keys = [];

          for (var key in obj) {
            keys.push(key);
          }

          return keys;
        };
        /*</replacement>*/


        module.exports = Duplex;
        /*<replacement>*/

        var util = Object.create(require('core-util-is'));
        util.inherits = require('inherits');
        /*</replacement>*/

        var Readable = require('./_stream_readable');

        var Writable = require('./_stream_writable');

        util.inherits(Duplex, Readable);
        {
          // avoid scope creep, the keys array can then be collected
          var keys = objectKeys(Writable.prototype);

          for (var v = 0; v < keys.length; v++) {
            var method = keys[v];
            if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
          }
        }

        function Duplex(options) {
          if (!(this instanceof Duplex)) return new Duplex(options);
          Readable.call(this, options);
          Writable.call(this, options);
          if (options && options.readable === false) this.readable = false;
          if (options && options.writable === false) this.writable = false;
          this.allowHalfOpen = true;
          if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
          this.once('end', onend);
        }

        Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
          // making it explicit this property is not enumerable
          // because otherwise some prototype manipulation in
          // userland will fail
          enumerable: false,
          get: function get() {
            return this._writableState.highWaterMark;
          }
        }); // the no-half-open enforcer

        function onend() {
          // if we allow half-open state, or if the writable side ended,
          // then we're ok.
          if (this.allowHalfOpen || this._writableState.ended) return; // no more data can be written.
          // But allow more writes to happen in this tick.

          pna.nextTick(onEndNT, this);
        }

        function onEndNT(self) {
          self.end();
        }

        Object.defineProperty(Duplex.prototype, 'destroyed', {
          get: function get() {
            if (this._readableState === undefined || this._writableState === undefined) {
              return false;
            }

            return this._readableState.destroyed && this._writableState.destroyed;
          },
          set: function set(value) {
            // we ignore the value if the stream
            // has not been initialized yet
            if (this._readableState === undefined || this._writableState === undefined) {
              return;
            } // backward compatibility, the user is explicitly
            // managing destroyed


            this._readableState.destroyed = value;
            this._writableState.destroyed = value;
          }
        });

        Duplex.prototype._destroy = function (err, cb) {
          this.push(null);
          this.end();
          pna.nextTick(cb, err);
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        'process-nextick-args': _req,
        'core-util-is': _req0,
        'inherits': _req1,
        './_stream_readable': _req2,
        './_stream_writable': _req3
      }));
    }
  };
});
//# sourceMappingURL=a09a2145613b9c6662fa6a8eee9c0952ecdcad00.js.map