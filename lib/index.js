"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setModalActions = exports.setModalList = exports.ModalProvider = exports.modal = exports.Manager = void 0;
var Manager_1 = __importDefault(require("./utils/service/Manager"));
exports.Manager = Manager_1.default;
var ModalManager_1 = __importDefault(require("./utils/service/ModalManager"));
exports.modal = ModalManager_1.default;
var modal_provider_1 = __importDefault(require("./components/modal-provider"));
exports.ModalProvider = modal_provider_1.default;
var modal_list_1 = require("./utils/config/modal-list");
Object.defineProperty(exports, "setModalList", {
  enumerable: true,
  get: function () {
    return modal_list_1.setModalList;
  }
});
var modal_actions_1 = require("./utils/config/modal-actions");
Object.defineProperty(exports, "setModalActions", {
  enumerable: true,
  get: function () {
    return modal_actions_1.setModalActions;
  }
});