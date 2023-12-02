"use strict";

var __extends = this && this.__extends || function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function (d, b) {
      d.__proto__ = b;
    } || function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    };
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var Manager_1 = __importDefault(require("./Manager"));
var uuid_1 = require("uuid");
var constants = {
  CHANGE: "change",
  CLOSE: "close"
};
var ModalManager = /** @class */function (_super) {
  __extends(ModalManager, _super);
  function ModalManager() {
    return _super.call(this) || this;
  }
  ModalManager.prototype.create = function (name, data) {
    this.name = name;
    this.data = data;
    this.emitter.emit(constants.CHANGE);
  };
  ModalManager.prototype.call = function (name, data) {
    if (data === void 0) {
      data = {};
    }
    this.create(name, {
      modalId: (0, uuid_1.v4)(),
      data: data
    });
  };
  ModalManager.prototype.close = function (position) {
    this.emitter.emit(constants.CLOSE, position);
  };
  return ModalManager;
}(Manager_1.default);
var modal = new ModalManager();
exports.default = modal;