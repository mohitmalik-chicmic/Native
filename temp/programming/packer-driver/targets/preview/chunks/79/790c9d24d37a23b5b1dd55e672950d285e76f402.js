System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var utils = require("../utils");

        function DataReader(data) {
          this.data = data; // type : see implementation

          this.length = data.length;
          this.index = 0;
          this.zero = 0;
        }

        DataReader.prototype = {
          /**
           * Check that the offset will not go too far.
           * @param {string} offset the additional offset to check.
           * @throws {Error} an Error if the offset is out of bounds.
           */
          checkOffset: function checkOffset(offset) {
            this.checkIndex(this.index + offset);
          },

          /**
           * Check that the specified index will not be too far.
           * @param {string} newIndex the index to check.
           * @throws {Error} an Error if the index is out of bounds.
           */
          checkIndex: function checkIndex(newIndex) {
            if (this.length < this.zero + newIndex || newIndex < 0) {
              throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
            }
          },

          /**
           * Change the index.
           * @param {number} newIndex The new index.
           * @throws {Error} if the new index is out of the data.
           */
          setIndex: function setIndex(newIndex) {
            this.checkIndex(newIndex);
            this.index = newIndex;
          },

          /**
           * Skip the next n bytes.
           * @param {number} n the number of bytes to skip.
           * @throws {Error} if the new index is out of the data.
           */
          skip: function skip(n) {
            this.setIndex(this.index + n);
          },

          /**
           * Get the byte at the specified index.
           * @param {number} i the index to use.
           * @return {number} a byte.
           */
          byteAt: function byteAt() {// see implementations
          },

          /**
           * Get the next number with a given byte size.
           * @param {number} size the number of bytes to read.
           * @return {number} the corresponding number.
           */
          readInt: function readInt(size) {
            var result = 0,
                i;
            this.checkOffset(size);

            for (i = this.index + size - 1; i >= this.index; i--) {
              result = (result << 8) + this.byteAt(i);
            }

            this.index += size;
            return result;
          },

          /**
           * Get the next string with a given byte size.
           * @param {number} size the number of bytes to read.
           * @return {string} the corresponding string.
           */
          readString: function readString(size) {
            return utils.transformTo("string", this.readData(size));
          },

          /**
           * Get raw data without conversion, <size> bytes.
           * @param {number} size the number of bytes to read.
           * @return {Object} the raw data, implementation specific.
           */
          readData: function readData() {// see implementations
          },

          /**
           * Find the last occurrence of a zip signature (4 bytes).
           * @param {string} sig the signature to find.
           * @return {number} the index of the last occurrence, -1 if not found.
           */
          lastIndexOfSignature: function lastIndexOfSignature() {// see implementations
          },

          /**
           * Read the signature (4 bytes) at the current position and compare it with sig.
           * @param {string} sig the expected signature
           * @return {boolean} true if the signature matches, false otherwise.
           */
          readAndCheckSignature: function readAndCheckSignature() {// see implementations
          },

          /**
           * Get the next date.
           * @return {Date} the date.
           */
          readDate: function readDate() {
            var dostime = this.readInt(4);
            return new Date(Date.UTC((dostime >> 25 & 0x7f) + 1980, // year
            (dostime >> 21 & 0x0f) - 1, // month
            dostime >> 16 & 0x1f, // day
            dostime >> 11 & 0x1f, // hour
            dostime >> 5 & 0x3f, // minute
            (dostime & 0x1f) << 1)); // second
          }
        };
        module.exports = DataReader; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        '../utils': _req
      }));
    }
  };
});
//# sourceMappingURL=790c9d24d37a23b5b1dd55e672950d285e76f402.js.map