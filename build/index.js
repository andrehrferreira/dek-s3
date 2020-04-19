"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _crypto = require("crypto");

var _crypto2 = _interopRequireDefault(_crypto);

var _awsSdk = require("aws-sdk");

var _awsSdk2 = _interopRequireDefault(_awsSdk);

var _multerS = require("multer-s3");

var _multerS2 = _interopRequireDefault(_multerS);

var _md = require("md5");

var _md2 = _interopRequireDefault(_md);

var _scope = require("@dekproject/scope");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    try {
                        if (!Object.prototype.hasOwnProperty.call(process.env, "S3_TMP_UPLOAD_DIRETORY")) {
                            // eslint-disable-next-line no-console
                            console.log("[ S3 ] - There is no S3_TMP_UPLOAD_DIRETORY variable in the .env file.");
                        } else if (!Object.prototype.hasOwnProperty.call(process.env, "S3_BUCKET_NAME")) {
                            // eslint-disable-next-line no-console
                            console.log("[ S3 ] - There is no S3_BUCKET_NAME variable in the .env file.");
                        } else if (!Object.prototype.hasOwnProperty.call(process.env, "AWS_ACCESS_KEY_ID")) {
                            // eslint-disable-next-line no-console
                            console.log("[ S3 ] - There is no AWS_ACCESS_KEY_ID variable in the .env file.");
                        } else if (!Object.prototype.hasOwnProperty.call(process.env, "AWS_SECRET_ACCESS_KEY")) {
                            // eslint-disable-next-line no-console
                            console.log("[ S3 ] - There is no AWS_SECRET_ACCESS_KEY variable in the .env file.");
                        } else if (!Object.prototype.hasOwnProperty.call(process.env, "AWS_DEFAULT_REGION")) {
                            // eslint-disable-next-line no-console
                            console.log("[ S3 ] - There is no AWS_DEFAULT_REGION variable in the .env file.");
                        } else {
                            _scope.$.set("s3", (0, _multer2.default)({
                                dest: _path2.default.resolve(process.env.S3_TMP_UPLOAD_DIRETORY),
                                storage: (0, _multerS2.default)({
                                    s3: new _awsSdk2.default.S3(),
                                    bucket: process.env.S3_BUCKET_NAME,
                                    contentType: _multerS2.default.AUTO_CONTENT_TYPE,
                                    acl: "public-read",
                                    key: function key(req, file, cb) {
                                        _crypto2.default.randomBytes(16, function (err, hash) {
                                            if (err) cb(err);else {
                                                var hashHex = hash.toString("hex");
                                                var fileName = hashHex.substring(0, 2) + "/" + hashHex.substring(2, 5) + "/" + hashHex.substring(5, 9) + "/" + hashHex.substring(9, 14) + "/" + hashHex.substring(14, 20) + "/" + (0, _md2.default)(file.originalname) + _path2.default.extname(file.originalname);
                                                cb(null, fileName);
                                            }
                                        });
                                    }
                                }),
                                limits: {
                                    fileSize: 5 * 1024 * 1024
                                }
                            }));
                        }
                    } catch (e) {
                        // eslint-disable-next-line no-console
                        console.log("[ S3 ] - " + e.message);
                    }

                case 1:
                case "end":
                    return _context.stop();
            }
        }
    }, _callee, undefined);
}));
//# sourceMappingURL=index.js.map