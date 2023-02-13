System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _req5, _cjsExports, __cjsMetaURL;

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
    }, function (_unresolved_7) {
      _req4 = _unresolved_7.__cjsMetaURL;
    }, function (_unresolved_8) {
      _req5 = _unresolved_8.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var readerFor = require("./reader/readerFor");

        var utils = require("./utils");

        var CompressedObject = require("./compressedObject");

        var crc32fn = require("./crc32");

        var utf8 = require("./utf8");

        var compressions = require("./compressions");

        var support = require("./support");

        var MADE_BY_DOS = 0x00;
        var MADE_BY_UNIX = 0x03;
        /**
         * Find a compression registered in JSZip.
         * @param {string} compressionMethod the method magic to find.
         * @return {Object|null} the JSZip compression object, null if none found.
         */

        var findCompression = function (compressionMethod) {
          for (var method in compressions) {
            if (!Object.prototype.hasOwnProperty.call(compressions, method)) {
              continue;
            }

            if (compressions[method].magic === compressionMethod) {
              return compressions[method];
            }
          }

          return null;
        }; // class ZipEntry {{{

        /**
         * An entry in the zip file.
         * @constructor
         * @param {Object} options Options of the current file.
         * @param {Object} loadOptions Options for loading the stream.
         */


        function ZipEntry(options, loadOptions) {
          this.options = options;
          this.loadOptions = loadOptions;
        }

        ZipEntry.prototype = {
          /**
           * say if the file is encrypted.
           * @return {boolean} true if the file is encrypted, false otherwise.
           */
          isEncrypted: function () {
            // bit 1 is set
            return (this.bitFlag & 0x0001) === 0x0001;
          },

          /**
           * say if the file has utf-8 filename/comment.
           * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
           */
          useUTF8: function () {
            // bit 11 is set
            return (this.bitFlag & 0x0800) === 0x0800;
          },

          /**
           * Read the local part of a zip file and add the info in this object.
           * @param {DataReader} reader the reader to use.
           */
          readLocalPart: function (reader) {
            var compression, localExtraFieldsLength; // we already know everything from the central dir !
            // If the central dir data are false, we are doomed.
            // On the bright side, the local part is scary  : zip64, data descriptors, both, etc.
            // The less data we get here, the more reliable this should be.
            // Let's skip the whole header and dash to the data !

            reader.skip(22); // in some zip created on windows, the filename stored in the central dir contains \ instead of /.
            // Strangely, the filename here is OK.
            // I would love to treat these zip files as corrupted (see http://www.info-zip.org/FAQ.html#backslashes
            // or APPNOTE#4.4.17.1, "All slashes MUST be forward slashes '/'") but there are a lot of bad zip generators...
            // Search "unzip mismatching "local" filename continuing with "central" filename version" on
            // the internet.
            //
            // I think I see the logic here : the central directory is used to display
            // content and the local directory is used to extract the files. Mixing / and \
            // may be used to display \ to windows users and use / when extracting the files.
            // Unfortunately, this lead also to some issues : http://seclists.org/fulldisclosure/2009/Sep/394

            this.fileNameLength = reader.readInt(2);
            localExtraFieldsLength = reader.readInt(2); // can't be sure this will be the same as the central dir
            // the fileName is stored as binary data, the handleUTF8 method will take care of the encoding.

            this.fileName = reader.readData(this.fileNameLength);
            reader.skip(localExtraFieldsLength);

            if (this.compressedSize === -1 || this.uncompressedSize === -1) {
              throw new Error("Bug or corrupted zip : didn't get enough information from the central directory " + "(compressedSize === -1 || uncompressedSize === -1)");
            }

            compression = findCompression(this.compressionMethod);

            if (compression === null) {
              // no compression found
              throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
            }

            this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
          },

          /**
           * Read the central part of a zip file and add the info in this object.
           * @param {DataReader} reader the reader to use.
           */
          readCentralPart: function (reader) {
            this.versionMadeBy = reader.readInt(2);
            reader.skip(2); // this.versionNeeded = reader.readInt(2);

            this.bitFlag = reader.readInt(2);
            this.compressionMethod = reader.readString(2);
            this.date = reader.readDate();
            this.crc32 = reader.readInt(4);
            this.compressedSize = reader.readInt(4);
            this.uncompressedSize = reader.readInt(4);
            var fileNameLength = reader.readInt(2);
            this.extraFieldsLength = reader.readInt(2);
            this.fileCommentLength = reader.readInt(2);
            this.diskNumberStart = reader.readInt(2);
            this.internalFileAttributes = reader.readInt(2);
            this.externalFileAttributes = reader.readInt(4);
            this.localHeaderOffset = reader.readInt(4);

            if (this.isEncrypted()) {
              throw new Error("Encrypted zip are not supported");
            } // will be read in the local part, see the comments there


            reader.skip(fileNameLength);
            this.readExtraFields(reader);
            this.parseZIP64ExtraField(reader);
            this.fileComment = reader.readData(this.fileCommentLength);
          },

          /**
           * Parse the external file attributes and get the unix/dos permissions.
           */
          processAttributes: function () {
            this.unixPermissions = null;
            this.dosPermissions = null;
            var madeBy = this.versionMadeBy >> 8; // Check if we have the DOS directory flag set.
            // We look for it in the DOS and UNIX permissions
            // but some unknown platform could set it as a compatibility flag.

            this.dir = this.externalFileAttributes & 0x0010 ? true : false;

            if (madeBy === MADE_BY_DOS) {
              // first 6 bits (0 to 5)
              this.dosPermissions = this.externalFileAttributes & 0x3F;
            }

            if (madeBy === MADE_BY_UNIX) {
              this.unixPermissions = this.externalFileAttributes >> 16 & 0xFFFF; // the octal permissions are in (this.unixPermissions & 0x01FF).toString(8);
            } // fail safe : if the name ends with a / it probably means a folder


            if (!this.dir && this.fileNameStr.slice(-1) === "/") {
              this.dir = true;
            }
          },

          /**
           * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
           * @param {DataReader} reader the reader to use.
           */
          parseZIP64ExtraField: function () {
            if (!this.extraFields[0x0001]) {
              return;
            } // should be something, preparing the extra reader


            var extraReader = readerFor(this.extraFields[0x0001].value); // I really hope that these 64bits integer can fit in 32 bits integer, because js
            // won't let us have more.

            if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
              this.uncompressedSize = extraReader.readInt(8);
            }

            if (this.compressedSize === utils.MAX_VALUE_32BITS) {
              this.compressedSize = extraReader.readInt(8);
            }

            if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
              this.localHeaderOffset = extraReader.readInt(8);
            }

            if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
              this.diskNumberStart = extraReader.readInt(4);
            }
          },

          /**
           * Read the central part of a zip file and add the info in this object.
           * @param {DataReader} reader the reader to use.
           */
          readExtraFields: function (reader) {
            var end = reader.index + this.extraFieldsLength,
                extraFieldId,
                extraFieldLength,
                extraFieldValue;

            if (!this.extraFields) {
              this.extraFields = {};
            }

            while (reader.index + 4 < end) {
              extraFieldId = reader.readInt(2);
              extraFieldLength = reader.readInt(2);
              extraFieldValue = reader.readData(extraFieldLength);
              this.extraFields[extraFieldId] = {
                id: extraFieldId,
                length: extraFieldLength,
                value: extraFieldValue
              };
            }

            reader.setIndex(end);
          },

          /**
           * Apply an UTF8 transformation if needed.
           */
          handleUTF8: function () {
            var decodeParamType = support.uint8array ? "uint8array" : "array";

            if (this.useUTF8()) {
              this.fileNameStr = utf8.utf8decode(this.fileName);
              this.fileCommentStr = utf8.utf8decode(this.fileComment);
            } else {
              var upath = this.findExtraFieldUnicodePath();

              if (upath !== null) {
                this.fileNameStr = upath;
              } else {
                // ASCII text or unsupported code page
                var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
                this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
              }

              var ucomment = this.findExtraFieldUnicodeComment();

              if (ucomment !== null) {
                this.fileCommentStr = ucomment;
              } else {
                // ASCII text or unsupported code page
                var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
                this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
              }
            }
          },

          /**
           * Find the unicode path declared in the extra field, if any.
           * @return {String} the unicode path, null otherwise.
           */
          findExtraFieldUnicodePath: function () {
            var upathField = this.extraFields[0x7075];

            if (upathField) {
              var extraReader = readerFor(upathField.value); // wrong version

              if (extraReader.readInt(1) !== 1) {
                return null;
              } // the crc of the filename changed, this field is out of date.


              if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
                return null;
              }

              return utf8.utf8decode(extraReader.readData(upathField.length - 5));
            }

            return null;
          },

          /**
           * Find the unicode comment declared in the extra field, if any.
           * @return {String} the unicode comment, null otherwise.
           */
          findExtraFieldUnicodeComment: function () {
            var ucommentField = this.extraFields[0x6375];

            if (ucommentField) {
              var extraReader = readerFor(ucommentField.value); // wrong version

              if (extraReader.readInt(1) !== 1) {
                return null;
              } // the crc of the comment changed, this field is out of date.


              if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
                return null;
              }

              return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
            }

            return null;
          }
        };
        module.exports = ZipEntry; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        './reader/readerFor': _req,
        './utils': _req0,
        './compressedObject': _req1,
        './crc32': _req2,
        './utf8': _req3,
        './compressions': _req4,
        './support': _req5
      }));
    }
  };
});
//# sourceMappingURL=b7caeacc1d393b843c7e04892971b4f240ff5c7a.js.map