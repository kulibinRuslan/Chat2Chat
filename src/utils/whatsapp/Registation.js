"use strict";
exports.__esModule = true;
exports.Registration = void 0;
var WhastApp_1 = require("../../clients/WhastApp");
var Registration = /** @class */ (function () {
    function Registration() {
    }
    Registration.prototype.regNumber = function () {
        var sock = new WhastApp_1.WhatsApp(true);
        sock.connectToWhatsApp();
    };
    return Registration;
}());
exports.Registration = Registration;
