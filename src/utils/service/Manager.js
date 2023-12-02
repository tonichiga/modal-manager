"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var constants = {
    CHANGE: "change",
    CLOSE: "close",
};
var Manager = /** @class */ (function () {
    function Manager() {
        this.name = "";
        this.data = {};
        this.emitter = new events_1.EventEmitter();
    }
    Manager.prototype.addEventListener = function (event, listener) {
        this.emitter.addListener(event, listener);
    };
    Manager.prototype.removeEventListener = function (event, listener) {
        this.emitter.removeListener(event, listener);
    };
    Manager.prototype.emitChange = function () {
        this.emitter.emit(constants.CHANGE, this.name, this.data);
    };
    Manager.prototype.close = function () {
        var closeList = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            closeList[_i] = arguments[_i];
        }
        this.name = null;
        this.data = {};
        this.emitClose(closeList);
    };
    Manager.prototype.emitClose = function (closeList) {
        this.emitter.emit(constants.CLOSE, closeList);
    };
    return Manager;
}());
exports.default = Manager;
