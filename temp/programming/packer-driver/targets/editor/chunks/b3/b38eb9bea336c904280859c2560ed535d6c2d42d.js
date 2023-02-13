System.register(["__unresolved_0", "process-nextick-args"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, _destroy, _undestroy, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_processNextickArgs) {
      _req = _processNextickArgs.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        'use strict';
        /*<replacement>*/

        var pna = require('process-nextick-args');
        /*</replacement>*/
        // undocumented cb() API, needed for core, not for public API


        function destroy(err, cb) {
          var _this = this;

          var readableDestroyed = this._readableState && this._readableState.destroyed;
          var writableDestroyed = this._writableState && this._writableState.destroyed;

          if (readableDestroyed || writableDestroyed) {
            if (cb) {
              cb(err);
            } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
              pna.nextTick(emitErrorNT, this, err);
            }

            return this;
          } // we set destroyed to true before firing error callbacks in order
          // to make it re-entrance safe in case destroy() is called within callbacks


          if (this._readableState) {
            this._readableState.destroyed = true;
          } // if this is a duplex stream mark the writable part as destroyed as well


          if (this._writableState) {
            this._writableState.destroyed = true;
          }

          this._destroy(err || null, function (err) {
            if (!cb && err) {
              pna.nextTick(emitErrorNT, _this, err);

              if (_this._writableState) {
                _this._writableState.errorEmitted = true;
              }
            } else if (cb) {
              cb(err);
            }
          });

          return this;
        }

        function undestroy() {
          if (this._readableState) {
            this._readableState.destroyed = false;
            this._readableState.reading = false;
            this._readableState.ended = false;
            this._readableState.endEmitted = false;
          }

          if (this._writableState) {
            this._writableState.destroyed = false;
            this._writableState.ended = false;
            this._writableState.ending = false;
            this._writableState.finished = false;
            this._writableState.errorEmitted = false;
          }
        }

        function emitErrorNT(self, err) {
          self.emit('error', err);
        }

        module.exports = {
          destroy: destroy,
          undestroy: undestroy
        }; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        _destroy = module.exports.destroy;
        _undestroy = module.exports.undestroy;
      }, () => ({
        'process-nextick-args': _req
      }));
    }
  };
});
//# sourceMappingURL=b38eb9bea336c904280859c2560ed535d6c2d42d.js.map