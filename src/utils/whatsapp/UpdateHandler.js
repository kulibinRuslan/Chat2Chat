"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UpdateHandler = void 0;
var baileys_1 = require("@adiwajshing/baileys");
var MessageHandler_1 = require("./MessageHandler");
var WhastApp_1 = require("../../clients/WhastApp");
var ConfigStorage_1 = require("../ConfigStorage");
var qrcode_1 = require("qrcode");
var fs = require("fs");
var UpdateHandler = /** @class */ (function () {
    function UpdateHandler(_client, _isRegister) {
        this.saveCodePath = ConfigStorage_1.ConfigStorage.codeSavePath;
        this.saveSessionPath = ConfigStorage_1.ConfigStorage.saveSessionPath;
        this.isRegister = false;
        this.isRegister = _isRegister;
        this.client = _client;
    }
    UpdateHandler.prototype.saveQr = function (qr) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, qrcode_1.toFile)(this.saveCodePath, [
                    {
                        data: qr,
                        mode: 'string'
                    },
                ]);
                return [2 /*return*/];
            });
        });
    };
    UpdateHandler.prototype.remove = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err;
            return __generator(this, function (_a) {
                try {
                    fs.rm(this.saveSessionPath, { recursive: true }, function (_) { return _; });
                }
                catch (e) {
                    err = e;
                    console.log("".concat(err.name, ": ").concat(err.message));
                }
                return [2 /*return*/];
            });
        });
    };
    UpdateHandler.prototype.startHandler = function (saveCreds) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                // const { saveCreds } = await useMultiFileAuthState(
                //     this.saveSessionPath
                // );
                this.client.ev.on('creds.update', function () {
                    saveCreds();
                });
                this.client.ev.on('connection.update', function (update) { return __awaiter(_this, void 0, void 0, function () {
                    var qr, connection, lastDisconnect, shouldReconnect, code;
                    var _this = this;
                    var _a, _b, _c, _d, _e, _f;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                qr = update.qr, connection = update.connection, lastDisconnect = update.lastDisconnect;
                                if (qr) {
                                    console.log('Картинка сохранен');
                                    this.saveQr(qr);
                                }
                                if (!(connection === 'close')) return [3 /*break*/, 2];
                                console.log("\u0421\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0440\u044B\u0442\u043E \u0438\u0437 \u0437\u0430 ".concat((_a = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _a === void 0 ? void 0 : _a.name, ": ").concat((_b = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _b === void 0 ? void 0 : _b.message));
                                shouldReconnect = ((_d = (_c = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _c === void 0 ? void 0 : _c.output) === null || _d === void 0 ? void 0 : _d.statusCode) !== baileys_1.DisconnectReason.loggedOut;
                                code = (_f = (_e = lastDisconnect === null || lastDisconnect === void 0 ? void 0 : lastDisconnect.error) === null || _e === void 0 ? void 0 : _e.output) === null || _f === void 0 ? void 0 : _f.statusCode;
                                if (code == 403 || code == 401) {
                                    this.remove();
                                    shouldReconnect = false;
                                }
                                if (!shouldReconnect) return [3 /*break*/, 2];
                                return [4 /*yield*/, new WhastApp_1.WhatsApp(this.isRegister).connectToWhatsApp()];
                            case 1:
                                _g.sent();
                                _g.label = 2;
                            case 2:
                                if (connection == 'open') {
                                    console.log('Открыто соединение');
                                    if (this.isRegister) {
                                        console.log('Закрыто соединение');
                                        setTimeout(function () { return process.exit(); }, 3000);
                                    }
                                    else {
                                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, new MessageHandler_1.MessageHandler(this.client).handleWhatsAppMessage()];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }, 5000);
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
            });
        });
    };
    return UpdateHandler;
}());
exports.UpdateHandler = UpdateHandler;
