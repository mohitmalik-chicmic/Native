System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "setimmediate"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _cjsExports, _newBlob, _applyFromCharCode, _transformTo, _resolve, _getTypeOf, _checkSupport, _MAX_VALUE_16BITS, _MAX_VALUE_32BITS, _pretty, _delay, _inherits, _extend, _prepareContent, __cjsMetaURL;

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
    }, function (_setimmediate) {
      _req3 = _setimmediate.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var support = require("./support");

        var base64 = require("./base64");

        var nodejsUtils = require("./nodejsUtils");

        var external = require("./external");

        require("setimmediate");
        /**
         * Convert a string that pass as a "binary string": it should represent a byte
         * array but may have > 255 char codes. Be sure to take only the first byte
         * and returns the byte array.
         * @param {String} str the string to transform.
         * @return {Array|Uint8Array} the string in a binary format.
         */


        function string2binary(str) {
          var result = null;

          if (support.uint8array) {
            result = new Uint8Array(str.length);
          } else {
            result = new Array(str.length);
          }

          return stringToArrayLike(str, result);
        }
        /**
         * Create a new blob with the given content and the given type.
         * @param {String|ArrayBuffer} part the content to put in the blob. DO NOT use
         * an Uint8Array because the stock browser of android 4 won't accept it (it
         * will be silently converted to a string, "[object Uint8Array]").
         *
         * Use only ONE part to build the blob to avoid a memory leak in IE11 / Edge:
         * when a large amount of Array is used to create the Blob, the amount of
         * memory consumed is nearly 100 times the original data amount.
         *
         * @param {String} type the mime type of the blob.
         * @return {Blob} the created blob.
         */


        exports.newBlob = function (part, type) {
          exports.checkSupport("blob");

          try {
            // Blob constructor
            return new Blob([part], {
              type: type
            });
          } catch (e) {
            try {
              // deprecated, browser only, old way
              var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
              var builder = new Builder();
              builder.append(part);
              return builder.getBlob(type);
            } catch (e) {
              // well, fuck ?!
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        /**
         * The identity function.
         * @param {Object} input the input.
         * @return {Object} the same input.
         */


        function identity(input) {
          return input;
        }
        /**
         * Fill in an array with a string.
         * @param {String} str the string to use.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to fill in (will be mutated).
         * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated array.
         */


        function stringToArrayLike(str, array) {
          for (var i = 0; i < str.length; ++i) {
            array[i] = str.charCodeAt(i) & 0xFF;
          }

          return array;
        }
        /**
         * An helper for the function arrayLikeToString.
         * This contains static information and functions that
         * can be optimized by the browser JIT compiler.
         */


        var arrayToStringHelper = {
          /**
           * Transform an array of int into a string, chunk by chunk.
           * See the performances notes on arrayLikeToString.
           * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
           * @param {String} type the type of the array.
           * @param {Integer} chunk the chunk size.
           * @return {String} the resulting string.
           * @throws Error if the chunk is too big for the stack.
           */
          stringifyByChunk: function stringifyByChunk(array, type, chunk) {
            var result = [],
                k = 0,
                len = array.length; // shortcut

            if (len <= chunk) {
              return String.fromCharCode.apply(null, array);
            }

            while (k < len) {
              if (type === "array" || type === "nodebuffer") {
                result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
              } else {
                result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
              }

              k += chunk;
            }

            return result.join("");
          },

          /**
           * Call String.fromCharCode on every item in the array.
           * This is the naive implementation, which generate A LOT of intermediate string.
           * This should be used when everything else fail.
           * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
           * @return {String} the result.
           */
          stringifyByChar: function stringifyByChar(array) {
            var resultStr = "";

            for (var i = 0; i < array.length; i++) {
              resultStr += String.fromCharCode(array[i]);
            }

            return resultStr;
          },
          applyCanBeUsed: {
            /**
             * true if the browser accepts to use String.fromCharCode on Uint8Array
             */
            uint8array: function () {
              try {
                return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
              } catch (e) {
                return false;
              }
            }(),

            /**
             * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
             */
            nodebuffer: function () {
              try {
                return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
              } catch (e) {
                return false;
              }
            }()
          }
        };
        /**
         * Transform an array-like object to a string.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
         * @return {String} the result.
         */

        function arrayLikeToString(array) {
          // Performances notes :
          // --------------------
          // String.fromCharCode.apply(null, array) is the fastest, see
          // see http://jsperf.com/converting-a-uint8array-to-a-string/2
          // but the stack is limited (and we can get huge arrays !).
          //
          // result += String.fromCharCode(array[i]); generate too many strings !
          //
          // This code is inspired by http://jsperf.com/arraybuffer-to-string-apply-performance/2
          // TODO : we now have workers that split the work. Do we still need that ?
          var chunk = 65536,
              type = exports.getTypeOf(array),
              canUseApply = true;

          if (type === "uint8array") {
            canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
          } else if (type === "nodebuffer") {
            canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
          }

          if (canUseApply) {
            while (chunk > 1) {
              try {
                return arrayToStringHelper.stringifyByChunk(array, type, chunk);
              } catch (e) {
                chunk = Math.floor(chunk / 2);
              }
            }
          } // no apply or chunk error : slow and painful algorithm
          // default browser on android 4.*


          return arrayToStringHelper.stringifyByChar(array);
        }

        exports.applyFromCharCode = arrayLikeToString;
        /**
         * Copy the data from an array-like to an other array-like.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayFrom the origin array.
         * @param {Array|ArrayBuffer|Uint8Array|Buffer} arrayTo the destination array which will be mutated.
         * @return {Array|ArrayBuffer|Uint8Array|Buffer} the updated destination array.
         */

        function arrayLikeToArrayLike(arrayFrom, arrayTo) {
          for (var i = 0; i < arrayFrom.length; i++) {
            arrayTo[i] = arrayFrom[i];
          }

          return arrayTo;
        } // a matrix containing functions to transform everything into everything.


        var transform = {}; // string to ?

        transform["string"] = {
          "string": identity,
          "array": function array(input) {
            return stringToArrayLike(input, new Array(input.length));
          },
          "arraybuffer": function arraybuffer(input) {
            return transform["string"]["uint8array"](input).buffer;
          },
          "uint8array": function uint8array(input) {
            return stringToArrayLike(input, new Uint8Array(input.length));
          },
          "nodebuffer": function nodebuffer(input) {
            return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
          }
        }; // array to ?

        transform["array"] = {
          "string": arrayLikeToString,
          "array": identity,
          "arraybuffer": function arraybuffer(input) {
            return new Uint8Array(input).buffer;
          },
          "uint8array": function uint8array(input) {
            return new Uint8Array(input);
          },
          "nodebuffer": function nodebuffer(input) {
            return nodejsUtils.newBufferFrom(input);
          }
        }; // arraybuffer to ?

        transform["arraybuffer"] = {
          "string": function string(input) {
            return arrayLikeToString(new Uint8Array(input));
          },
          "array": function array(input) {
            return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
          },
          "arraybuffer": identity,
          "uint8array": function uint8array(input) {
            return new Uint8Array(input);
          },
          "nodebuffer": function nodebuffer(input) {
            return nodejsUtils.newBufferFrom(new Uint8Array(input));
          }
        }; // uint8array to ?

        transform["uint8array"] = {
          "string": arrayLikeToString,
          "array": function array(input) {
            return arrayLikeToArrayLike(input, new Array(input.length));
          },
          "arraybuffer": function arraybuffer(input) {
            return input.buffer;
          },
          "uint8array": identity,
          "nodebuffer": function nodebuffer(input) {
            return nodejsUtils.newBufferFrom(input);
          }
        }; // nodebuffer to ?

        transform["nodebuffer"] = {
          "string": arrayLikeToString,
          "array": function array(input) {
            return arrayLikeToArrayLike(input, new Array(input.length));
          },
          "arraybuffer": function arraybuffer(input) {
            return transform["nodebuffer"]["uint8array"](input).buffer;
          },
          "uint8array": function uint8array(input) {
            return arrayLikeToArrayLike(input, new Uint8Array(input.length));
          },
          "nodebuffer": identity
        };
        /**
         * Transform an input into any type.
         * The supported output type are : string, array, uint8array, arraybuffer, nodebuffer.
         * If no output type is specified, the unmodified input will be returned.
         * @param {String} outputType the output type.
         * @param {String|Array|ArrayBuffer|Uint8Array|Buffer} input the input to convert.
         * @throws {Error} an Error if the browser doesn't support the requested output type.
         */

        exports.transformTo = function (outputType, input) {
          if (!input) {
            // undefined, null, etc
            // an empty string won't harm.
            input = "";
          }

          if (!outputType) {
            return input;
          }

          exports.checkSupport(outputType);
          var inputType = exports.getTypeOf(input);
          var result = transform[inputType][outputType](input);
          return result;
        };
        /**
         * Resolve all relative path components, "." and "..", in a path. If these relative components
         * traverse above the root then the resulting path will only contain the final path component.
         *
         * All empty components, e.g. "//", are removed.
         * @param {string} path A path with / or \ separators
         * @returns {string} The path with all relative path components resolved.
         */


        exports.resolve = function (path) {
          var parts = path.split("/");
          var result = [];

          for (var index = 0; index < parts.length; index++) {
            var part = parts[index]; // Allow the first and last component to be empty for trailing slashes.

            if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) {
              continue;
            } else if (part === "..") {
              result.pop();
            } else {
              result.push(part);
            }
          }

          return result.join("/");
        };
        /**
         * Return the type of the input.
         * The type will be in a format valid for JSZip.utils.transformTo : string, array, uint8array, arraybuffer.
         * @param {Object} input the input to identify.
         * @return {String} the (lowercase) type of the input.
         */


        exports.getTypeOf = function (input) {
          if (typeof input === "string") {
            return "string";
          }

          if (Object.prototype.toString.call(input) === "[object Array]") {
            return "array";
          }

          if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
            return "nodebuffer";
          }

          if (support.uint8array && input instanceof Uint8Array) {
            return "uint8array";
          }

          if (support.arraybuffer && input instanceof ArrayBuffer) {
            return "arraybuffer";
          }
        };
        /**
         * Throw an exception if the type is not supported.
         * @param {String} type the type to check.
         * @throws {Error} an Error if the browser doesn't support the requested type.
         */


        exports.checkSupport = function (type) {
          var supported = support[type.toLowerCase()];

          if (!supported) {
            throw new Error(type + " is not supported by this platform");
          }
        };

        exports.MAX_VALUE_16BITS = 65535;
        exports.MAX_VALUE_32BITS = -1; // well, "\xFF\xFF\xFF\xFF\xFF\xFF\xFF\xFF" is parsed as -1

        /**
         * Prettify a string read as binary.
         * @param {string} str the string to prettify.
         * @return {string} a pretty string.
         */

        exports.pretty = function (str) {
          var res = "",
              code,
              i;

          for (i = 0; i < (str || "").length; i++) {
            code = str.charCodeAt(i);
            res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
          }

          return res;
        };
        /**
         * Defer the call of a function.
         * @param {Function} callback the function to call asynchronously.
         * @param {Array} args the arguments to give to the callback.
         */


        exports.delay = function (callback, args, self) {
          setImmediate(function () {
            callback.apply(self || null, args || []);
          });
        };
        /**
         * Extends a prototype with an other, without calling a constructor with
         * side effects. Inspired by nodejs' `utils.inherits`
         * @param {Function} ctor the constructor to augment
         * @param {Function} superCtor the parent constructor to use
         */


        exports.inherits = function (ctor, superCtor) {
          var Obj = function Obj() {};

          Obj.prototype = superCtor.prototype;
          ctor.prototype = new Obj();
        };
        /**
         * Merge the objects passed as parameters into a new one.
         * @private
         * @param {...Object} var_args All objects to merge.
         * @return {Object} a new object with the data of the others.
         */


        exports.extend = function () {
          var result = {},
              i,
              attr;

          for (i = 0; i < arguments.length; i++) {
            // arguments is not enumerable in some browsers
            for (attr in arguments[i]) {
              if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") {
                result[attr] = arguments[i][attr];
              }
            }
          }

          return result;
        };
        /**
         * Transform arbitrary content into a Promise.
         * @param {String} name a name for the content being processed.
         * @param {Object} inputData the content to process.
         * @param {Boolean} isBinary true if the content is not an unicode string
         * @param {Boolean} isOptimizedBinaryString true if the string content only has one byte per character.
         * @param {Boolean} isBase64 true if the string content is encoded with base64.
         * @return {Promise} a promise in a format usable by JSZip.
         */


        exports.prepareContent = function (name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
          // if inputData is already a promise, this flatten it.
          var promise = external.Promise.resolve(inputData).then(function (data) {
            var isBlob = support.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);

            if (isBlob && typeof FileReader !== "undefined") {
              return new external.Promise(function (resolve, reject) {
                var reader = new FileReader();

                reader.onload = function (e) {
                  resolve(e.target.result);
                };

                reader.onerror = function (e) {
                  reject(e.target.error);
                };

                reader.readAsArrayBuffer(data);
              });
            } else {
              return data;
            }
          });
          return promise.then(function (data) {
            var dataType = exports.getTypeOf(data);

            if (!dataType) {
              return external.Promise.reject(new Error("Can't read the data of '" + name + "'. Is it " + "in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
            } // special case : it's way easier to work with Uint8Array than with ArrayBuffer


            if (dataType === "arraybuffer") {
              data = exports.transformTo("uint8array", data);
            } else if (dataType === "string") {
              if (isBase64) {
                data = base64.decode(data);
              } else if (isBinary) {
                // optimizedBinaryString === true means that the file has already been filtered with a 0xFF mask
                if (isOptimizedBinaryString !== true) {
                  // this is a string, not in a base64 format.
                  // Be sure that this is a correct "binary string"
                  data = string2binary(data);
                }
              }
            }

            return data;
          });
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _newBlob = module.exports.newBlob;
        _applyFromCharCode = module.exports.applyFromCharCode;
        _transformTo = module.exports.transformTo;
        _resolve = module.exports.resolve;
        _getTypeOf = module.exports.getTypeOf;
        _checkSupport = module.exports.checkSupport;
        _MAX_VALUE_16BITS = module.exports.MAX_VALUE_16BITS;
        _MAX_VALUE_32BITS = module.exports.MAX_VALUE_32BITS;
        _pretty = module.exports.pretty;
        _delay = module.exports.delay;
        _inherits = module.exports.inherits;
        _extend = module.exports.extend;
        _prepareContent = module.exports.prepareContent;
      }, () => ({
        './support': _req,
        './base64': _req0,
        './nodejsUtils': _req1,
        './external': _req2,
        'setimmediate': _req3
      }));
    }
  };
});
//# sourceMappingURL=a92ae7deff491e6efd456b91714e1d9bfed734de.js.map