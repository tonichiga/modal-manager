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
exports.modal = exports.ModalManager = exports.constants = void 0;
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
        _this.modalData = new Map(); // Сохраняем данные для каждого модального окна
        _this.create = _this.create.bind(_this);
        _this.call = _this.call.bind(_this);
        _this._openModalStateCallback = null;
        return _this;
    }
    ModalManager.prototype.create = function (name, payload, options) {
        var _this = this;
        var modalId = String(payload.modalId);
        this.modalData.set(modalId, { name: name, payload: payload, options: options });
        // Используем setTimeout для обеспечения асинхронного выполнения
        setTimeout(function () {
            _this.emitter.emit(exports.constants.CHANGE, name, payload, options);
        }, 0);
        return modalId;
    };
    ModalManager.prototype.call = function (name, data, options) {
        var _this = this;
        var modalId = uniqueID();
        var id = this.create(name, { modalId: modalId, data: data }, options);
        var lastOpenedModal = name;
        this.queue.push(id);
        // Используем setTimeout чтобы дать React возможность обновить DOM
        setTimeout(function () {
            var _a;
            (_a = _this._openModalStateCallback) === null || _a === void 0 ? void 0 : _a.call(_this, _this.getQueueState({
                queue: _this.queue,
                lastOpenedModal: lastOpenedModal,
            }));
        }, 0);
        return id;
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
    // Получить количество открытых модальных окон
    ModalManager.prototype.getModalCount = function () {
        return this.queue.length;
    };
    // Метод для закрытия всех модальных окон
    ModalManager.prototype.closeAll = function () {
        var _this = this;
        if (this.queue.length === 0)
            return;
        setTimeout(function () {
            var _a;
            _this.emitter.emit(exports.constants.CLOSE, "all");
            _this.queue = [];
            _this.modalData.clear();
            (_a = _this._openModalStateCallback) === null || _a === void 0 ? void 0 : _a.call(_this, _this.getQueueState({
                queue: _this.queue,
                closedModalName: undefined,
            }));
        }, 0);
    };
    return ModalManager;
}(Manager_1.default));
exports.ModalManager = ModalManager;
var modal = new ModalManager();
exports.modal = modal;
exports.default = modal;
