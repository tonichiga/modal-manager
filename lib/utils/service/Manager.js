"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var events_1 = require("events");
var Constants = {
  CHANGE: "change",
  CLOSE: "close"
};
var Manager = /** @class */function () {
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
  return Manager;
}();
exports.default = Manager;