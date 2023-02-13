System.register(["__unresolved_0", "stream", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _cjsExports, _Readable, _Writable, _Duplex, _Transform, _PassThrough, _Stream, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_stream) {
      _req = _stream.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req0 = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req1 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req2 = _unresolved_4.__cjsMetaURL;
    }, function (_unresolved_5) {
      _req3 = _unresolved_5.__cjsMetaURL;
    }, function (_unresolved_6) {
      _req4 = _unresolved_6.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var Stream = require('stream');

        if (process.env.READABLE_STREAM === 'disable' && Stream) {
          module.exports = Stream;
          exports = module.exports = Stream.Readable;
          exports.Readable = Stream.Readable;
          exports.Writable = Stream.Writable;
          exports.Duplex = Stream.Duplex;
          exports.Transform = Stream.Transform;
          exports.PassThrough = Stream.PassThrough;
          exports.Stream = Stream;
        } else {
          exports = module.exports = require('./lib/_stream_readable.js');
          exports.Stream = Stream || exports;
          exports.Readable = exports;
          exports.Writable = require('./lib/_stream_writable.js');
          exports.Duplex = require('./lib/_stream_duplex.js');
          exports.Transform = require('./lib/_stream_transform.js');
          exports.PassThrough = require('./lib/_stream_passthrough.js');
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _Readable = module.exports.Readable;
        _Writable = module.exports.Writable;
        _Duplex = module.exports.Duplex;
        _Transform = module.exports.Transform;
        _PassThrough = module.exports.PassThrough;
        _Stream = module.exports.Stream;
      }, () => ({
        'stream': _req,
        './lib/_stream_readable.js': _req0,
        './lib/_stream_writable.js': _req1,
        './lib/_stream_duplex.js': _req2,
        './lib/_stream_transform.js': _req3,
        './lib/_stream_passthrough.js': _req4
      }));
    }
  };
});
//# sourceMappingURL=ddf5c88a12c7f85e932c2981be76bde800999362.js.map