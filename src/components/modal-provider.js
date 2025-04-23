"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ModalManager_1 = require("../utils/ModalManager");
var ModalProvider = function (_a) {
    var modalList = _a.modalList, _b = _a.isOverflow, isOverflow = _b === void 0 ? true : _b, _c = _a.className, className = _c === void 0 ? "" : _c, _d = _a.backdropClassName, backdropClassName = _d === void 0 ? "" : _d, onModalStateChange = _a.onModalStateChange;
    var _e = (0, react_1.useState)([]), modals = _e[0], setModals = _e[1];
    var modalRefs = (0, react_1.useRef)(new Map());
    var applyCloseStyles = function (modalIndex) {
        return new Promise(function (resolve) {
            var modalElement = document.querySelector("[data-modal-index=\"".concat(modalIndex, "\"]"));
            if (!modalElement) {
                resolve(false);
                return;
            }
            modalElement.classList.add("modal_closing");
            setTimeout(function () {
                resolve(true);
            }, 300);
        });
    };
    (0, react_1.useEffect)(function () {
        if (onModalStateChange && modals.length >= 0) {
            var data = modals.map(function (modal) { return modal.payload; });
            var names = modals.map(function (modal) { return modal.name; });
            onModalStateChange(modals.length > 0, data, names);
        }
    }, [modals, onModalStateChange]);
    (0, react_1.useEffect)(function () {
        // Toggle body overflow
        if (typeof document !== "undefined") {
            document.body.style.overflow =
                isOverflow && modals.length > 0 ? "hidden" : "";
        }
    }, [modals.length, isOverflow]);
    (0, react_1.useEffect)(function () {
        var handleOpenModal = function (name, payload, options) {
            var id = "modal-".concat(payload.modalId || Date.now(), "-").concat(Math.random()
                .toString(36)
                .substring(2, 9));
            setModals(function (prevModals) { return __spreadArray(__spreadArray([], prevModals, true), [
                { id: id, name: name, payload: payload, options: options },
            ], false); });
        };
        var handleClose = function (position) { return __awaiter(void 0, void 0, void 0, function () {
            var i, indexToRemove;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(position === "all")) return [3 /*break*/, 5];
                        i = modals.length - 1;
                        _a.label = 1;
                    case 1:
                        if (!(i >= 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, applyCloseStyles(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i--;
                        return [3 /*break*/, 1];
                    case 4:
                        setModals([]);
                        return [2 /*return*/];
                    case 5:
                        indexToRemove = position;
                        if (typeof indexToRemove !== "number" ||
                            indexToRemove < 0 ||
                            indexToRemove >= modals.length) {
                            // Если индекс невалидный, закрываем последний
                            indexToRemove = modals.length - 1;
                        }
                        if (!(indexToRemove >= 0 && indexToRemove < modals.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, applyCloseStyles(indexToRemove)];
                    case 6:
                        _a.sent();
                        setModals(function (prevModals) {
                            return prevModals.filter(function (_, index) { return index !== indexToRemove; });
                        });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); };
        // Добавляем обработчики событий
        ModalManager_1.modal.emitter.on(ModalManager_1.constants.CHANGE, handleOpenModal);
        ModalManager_1.modal.emitter.on(ModalManager_1.constants.CLOSE, handleClose);
        return function () {
            // Удаляем обработчики при размонтировании
            ModalManager_1.modal.emitter.off(ModalManager_1.constants.CHANGE, handleOpenModal);
            ModalManager_1.modal.emitter.off(ModalManager_1.constants.CLOSE, handleClose);
        };
    }, [modals]);
    var handleCloseModal = function (index) {
        ModalManager_1.modal.close(index);
    };
    var saveModalRef = function (id, ref) {
        if (ref) {
            modalRefs.current.set(id, ref);
        }
        else {
            modalRefs.current.delete(id);
        }
    };
    // Предотвратить всплытие клика для модального контента
    var stopPropagation = function (e) {
        e.stopPropagation();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, modals.map(function (modalItem, index) {
        var name = modalItem.name, payload = modalItem.payload, options = modalItem.options, id = modalItem.id, props = __rest(modalItem, ["name", "payload", "options", "id"]);
        var Modal = modalList[name] || (function () { return react_1.default.createElement("div", null,
            "Modal not found: ",
            name); });
        var hideBackdrop = (options === null || options === void 0 ? void 0 : options.hideBackdrop) || false;
        var extraClass = (options === null || options === void 0 ? void 0 : options.extraClass) || "";
        return (react_1.default.createElement("div", { key: id, "data-modal-id": id, "data-modal-index": index, className: "modal_container ".concat(extraClass) },
            !hideBackdrop && (react_1.default.createElement("div", { onClick: function () {
                    var _a;
                    (options === null || options === void 0 ? void 0 : options.onClickBackdrop)
                        ? (_a = options === null || options === void 0 ? void 0 : options.onClickBackdrop) === null || _a === void 0 ? void 0 : _a.call(options, function () { return handleCloseModal(index); })
                        : handleCloseModal(index);
                }, className: "modal_backdrop" })),
            react_1.default.createElement("div", { className: "".concat(className, " modal_paper"), onClick: stopPropagation, ref: function (ref) { return saveModalRef(id, ref); } },
                react_1.default.createElement(Modal, __assign({}, (payload.data || {}), { modalIndex: index })))));
    })));
};
exports.default = ModalProvider;
