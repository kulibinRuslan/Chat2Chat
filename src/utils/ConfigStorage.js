"use strict";
exports.__esModule = true;
exports.ConfigStorage = void 0;
var fs_1 = require("fs");
var ini_1 = require("ini");
var iniFile = (0, ini_1.parse)((0, fs_1.readFileSync)('src/data/settings.ini', 'utf-8'));
var ConfigStorage = /** @class */ (function () {
    function ConfigStorage() {
        this.codeSavePath = iniFile.codeSavePath;
        this.saveSessionPath = iniFile.saveSessionPath;
        this.isRegister = false;
    }
    return ConfigStorage;
}());
exports.ConfigStorage = ConfigStorage;
