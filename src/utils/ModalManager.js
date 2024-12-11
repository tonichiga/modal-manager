"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalManager = exports.constants = void 0;
var Manager_1 = __importDefault(require("./Manager"));
function uniqueID() {
    return Math.floor(Math.random() * Date.now());
}
exports.constants = {
    CHANGE: "change",
    CLOSE: "close",
};
var ModalManager = /** @class */ (function (_super) {
    __extends(ModalManager, _super);
    function ModalManager() {
        var _this = _super.call(this) || this;
        _this.queue = [];
        _this.create = _this.create.bind(_this);
        _this.call = _this.call.bind(_this);
        _this.close = _this.close.bind(_this);
        _this._openModalStateCallback = null;
        return _this;
    }
    ModalManager.prototype.create = function (name, payload) {
        this.name = name;
        this.data = payload;
        this.emitter.emit(exports.constants.CHANGE, this.name, this.data);
    };
    ModalManager.prototype.call = function (name, data) {
        var _a;
        this.create(name, { modalId: uniqueID(), data: data });
        var lastOpenedModal = name;
        this.queue.push(name);
        (_a = this._openModalStateCallback) === null || _a === void 0 ? void 0 : _a.call(this, this.getQueueState({
            queue: this.queue,
            lastOpenedModal: lastOpenedModal,
        }));
    };
    ModalManager.prototype.close = function (position) {
        var _a, _b;
        this.emitter.emit(exports.constants.CLOSE, position !== null && position !== void 0 ? position : ((_a = this.queue) === null || _a === void 0 ? void 0 : _a.length) - 1);
        var closedModalName = this.queue[this.queue.length - 1];
        this.queue.pop();
        (_b = this._openModalStateCallback) === null || _b === void 0 ? void 0 : _b.call(this, this.getQueueState({
            queue: this.queue,
            closedModalName: closedModalName,
        }));
    };
    ModalManager.prototype.getQueueState = function (_a) {
        var queue = _a.queue, closedModalName = _a.closedModalName, lastOpenedModal = _a.lastOpenedModal;
        return {
            isHaveOpenModals: queue.length > 0,
            queue: queue,
            lastOpenedModal: lastOpenedModal,
            closedModalName: closedModalName,
        };
    };
    ModalManager.prototype.onOpenModalState = function (callback) {
        this._openModalStateCallback = callback;
    };
    return ModalManager;
}(Manager_1.default));
exports.ModalManager = ModalManager;
var modal = new ModalManager();
exports.default = modal;
