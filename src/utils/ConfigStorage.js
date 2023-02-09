"use strict";
exports.__esModule = true;
exports.ConfigStorage = void 0;
var fs_1 = require("fs");
var ini_1 = require("ini");
var iniFile = (0, ini_1.parse)((0, fs_1.readFileSync)('src/data/settings.ini', 'utf-8'));
var ConfigStorage = /** @class */ (function () {
    function ConfigStorage() {
    }
    ConfigStorage.codeSavePath = iniFile.codeSavePath;
    ConfigStorage.saveSessionPath = iniFile.saveSessionPath;
    return ConfigStorage;
}());
exports.ConfigStorage = ConfigStorage;
