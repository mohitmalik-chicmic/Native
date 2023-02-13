System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _req3, _req4, _cjsExports, __cjsMetaURL;

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
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var utils = require("./utils");

        var external = require("./external");

        var utf8 = require("./utf8");

        var ZipEntries = require("./zipEntries");

        var Crc32Probe = require("./stream/Crc32Probe");

        var nodejsUtils = require("./nodejsUtils");
        /**
         * Check the CRC32 of an entry.
         * @param {ZipEntry} zipEntry the zip entry to check.
         * @return {Promise} the result.
         */


        function checkEntryCRC32(zipEntry) {
          return new external.Promise(function (resolve, reject) {
            var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
            worker.on("error", function (e) {
              reject(e);
            }).on("end", function () {
              if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
                reject(new Error("Corrupted zip : CRC32 mismatch"));
              } else {
                resolve();
              }
            }).resume();
          });
        }

        module.exports = function (data, options) {
          var zip = this;
          options = utils.extend(options || {}, {
            base64: false,
            checkCRC32: false,
            optimizedBinaryString: false,
            createFolders: false,
            decodeFileName: utf8.utf8decode
          });

          if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
            return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
          }

          return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function (data) {
            var zipEntries = new ZipEntries(options);
            zipEntries.load(data);
            return zipEntries;
          }).then(function checkCRC32(zipEntries) {
            var promises = [external.Promise.resolve(zipEntries)];
            var files = zipEntries.files;

            if (options.checkCRC32) {
              for (var i = 0; i < files.length; i++) {
                promises.push(checkEntryCRC32(files[i]));
              }
            }

            return external.Promise.all(promises);
          }).then(function addFiles(results) {
            var zipEntries = results.shift();
            var files = zipEntries.files;

            for (var i = 0; i < files.length; i++) {
              var input = files[i];
              var unsafeName = input.fileNameStr;
              var safeName = utils.resolve(input.fileNameStr);
              zip.file(safeName, input.decompressed, {
                binary: true,
                optimizedBinaryString: true,
                date: input.date,
                dir: input.dir,
                comment: input.fileCommentStr.length ? input.fileCommentStr : null,
                unixPermissions: input.unixPermissions,
                dosPermissions: input.dosPermissions,
                createFolders: options.createFolders
              });

              if (!input.dir) {
                zip.file(safeName).unsafeOriginalName = unsafeName;
              }
            }

            if (zipEntries.zipComment.length) {
              zip.comment = zipEntries.zipComment;
            }

            return zip;
          });
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './utils': _req,
        './external': _req0,
        './utf8': _req1,
        './zipEntries': _req2,
        './stream/Crc32Probe': _req3,
        './nodejsUtils': _req4
      }));
    }
  };
});
//# sourceMappingURL=0c6eecd0a69db24e325fa43ab60b8e77415942fd.js.map