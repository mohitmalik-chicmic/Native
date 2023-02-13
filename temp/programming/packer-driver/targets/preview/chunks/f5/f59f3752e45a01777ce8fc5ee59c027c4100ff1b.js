System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, _generateWorker, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        "use strict";

        var compressions = require("../compressions");

        var ZipFileWorker = require("./ZipFileWorker");
        /**
         * Find the compression to use.
         * @param {String} fileCompression the compression defined at the file level, if any.
         * @param {String} zipCompression the compression defined at the load() level.
         * @return {Object} the compression object to use.
         */


        var getCompression = function getCompression(fileCompression, zipCompression) {
          var compressionName = fileCompression || zipCompression;
          var compression = compressions[compressionName];

          if (!compression) {
            throw new Error(compressionName + " is not a valid compression method !");
          }

          return compression;
        };
        /**
         * Create a worker to generate a zip file.
         * @param {JSZip} zip the JSZip instance at the right root level.
         * @param {Object} options to generate the zip file.
         * @param {String} comment the comment to use.
         */


        exports.generateWorker = function (zip, options, comment) {
          var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
          var entriesCount = 0;

          try {
            zip.forEach(function (relativePath, file) {
              entriesCount++;
              var compression = getCompression(file.options.compression, options.compression);
              var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
              var dir = file.dir,
                  date = file.date;

              file._compressWorker(compression, compressionOptions).withStreamInfo("file", {
                name: relativePath,
                dir: dir,
                date: date,
                comment: file.comment || "",
                unixPermissions: file.unixPermissions,
                dosPermissions: file.dosPermissions
              }).pipe(zipFileWorker);
            });
            zipFileWorker.entriesCount = entriesCount;
          } catch (e) {
            zipFileWorker.error(e);
          }

          return zipFileWorker;
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _generateWorker = module.exports.generateWorker;
      }, () => ({
        '../compressions': _req,
        './ZipFileWorker': _req0
      }));
    }
  };
});
//# sourceMappingURL=f59f3752e45a01777ce8fc5ee59c027c4100ff1b.js.map