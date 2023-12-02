"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalProvider = exports.modal = exports.Manager = void 0;
var Manager_1 = __importDefault(require("./utils/Manager"));
exports.Manager = Manager_1.default;
var ModalManager_1 = __importDefault(require("./utils/ModalManager"));
exports.modal = ModalManager_1.default;
var modal_provider_1 = __importDefault(require("./components/modal-provider"));
exports.ModalProvider = modal_provider_1.default;
