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
var ModalManager_1 = __importStar(require("../utils/ModalManager"));
var ModalProvider = function (_a) {
    var modalList = _a.modalList, isOverflow = _a.isOverflow, className = _a.className, backdropClassName = _a.backdropClassName, modalManager = _a.modalManager, onModalStateChange = _a.onModalStateChange;
    var _b = (0, react_1.useState)([]), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)([]), names = _c[0], setNames = _c[1];
    var modalRef = (0, react_1.useRef)([]);
    var m = modalManager !== null && modalManager !== void 0 ? modalManager : ModalManager_1.default;
    (0, react_1.useEffect)(function () {
        if (!onModalStateChange)
            return;
        var modalState = data.length !== 0;
        onModalStateChange(modalState, data, names);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, names]);
    (0, react_1.useEffect)(function () {
        var handleOpenModal = function (name, data) {
            setData(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data], false); });
            setNames(function (prev) { return __spreadArray(__spreadArray([], prev, true), [name], false); });
            if (isOverflow) {
                if (typeof document === "undefined")
                    return;
                document.body.style.overflow = "hidden";
            }
        };
        var handleClose = function (position) {
            if (isOverflow) {
                if (typeof document !== "undefined") {
                    document.body.style.overflow = "";
                }
            }
            if (position === "all") {
                setData([]);
                setNames([]);
                return;
            }
            if (position === -1) {
                // remove last
                setData(function (prev) {
                    return prev.filter(function (_, index) { return index !== prev.length - 1; });
                });
                setNames(function (prev) {
                    return prev.filter(function (_, index) { return index !== prev.length - 1; });
                });
                return;
            }
            if (position === 0) {
                // remove first
                setData(function (prev) { return prev.filter(function (_, index) { return index !== 0; }); });
                setNames(function (prev) { return prev.filter(function (_, index) { return index !== 0; }); });
                return;
            }
            // remove position index
            setData(function (prev) {
                return prev.filter(function (_, index) { return index !== prev.length - 1; });
            });
            setNames(function (prev) {
                return prev.filter(function (_, index) { return index !== prev.length - 1; });
            });
        };
        m.addEventListener(ModalManager_1.constants.CHANGE, handleOpenModal);
        m.addEventListener(ModalManager_1.constants.CLOSE, handleClose);
        return function () {
            m.removeEventListener(ModalManager_1.constants.CHANGE, handleOpenModal);
            m.removeEventListener(ModalManager_1.constants.CLOSE, handleClose);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var activeModals = names.map(function (name) {
        var Component = modalList[name] || (function () { return react_1.default.createElement(react_1.default.Fragment, null); });
        return Component;
    });
    var handleCloseModal = function (index) {
        m.close(index);
    };
    var refReducer = function (index, value) {
        modalRef.current[index] = value;
    };
    return (react_1.default.createElement(react_1.default.Fragment, null, data.length !== 0 &&
        data.map(function (item, i) {
            var Modal = activeModals[i] || (function () { return react_1.default.createElement(react_1.default.Fragment, null); });
            return (react_1.default.createElement("div", { key: item.modalId, className: "modal-manager backdrop_modal_manager ".concat(backdropClassName) },
                react_1.default.createElement("div", { onClick: function (e) {
                        e.stopPropagation();
                        handleCloseModal(i);
                    }, className: "backdrop" }),
                react_1.default.createElement("div", { className: "".concat(className, " modal_paper") },
                    react_1.default.createElement("div", { ref: function (ref) {
                            refReducer(i, ref);
                        } },
                        react_1.default.createElement(Modal, __assign({}, item.data))))));
        })));
};
exports.default = ModalProvider;
