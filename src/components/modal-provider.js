"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ModalManager_1 = __importDefault(require("../utils/service/ModalManager"));
require("./backdrop.css");
var ModalManager_2 = __importDefault(require("../utils/service/ModalManager"));
var modal_list_1 = __importDefault(require("../utils/config/modal-list"));
var ModalProvider = function (_a) {
    var CustomComponent = _a.CustomComponent;
    var _b = (0, react_1.useState)([]), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)([]), names = _c[0], setNames = _c[1];
    var modalRef = (0, react_1.useRef)([]);
    (0, react_1.useEffect)(function () {
        var handleOpenModal = function (name, data) {
            setData(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data], false); });
            setNames(function (prev) { return __spreadArray(__spreadArray([], prev, true), [name], false); });
        };
        var handleClose = function (position) {
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
        ModalManager_1.default.addEventListener("change", handleOpenModal);
        ModalManager_1.default.addEventListener("close", handleClose);
        return function () {
            ModalManager_1.default.removeEventListener("change", handleOpenModal);
            ModalManager_1.default.removeEventListener("close", handleClose);
        };
    }, []);
    var activeModals = names.map(function (name) {
        var Component = modal_list_1.default[name] || (function () { return react_1.default.createElement(react_1.default.Fragment, null); });
        return Component;
    });
    var handleCloseModal = function (index, e) {
        if (modalRef.current[index] &&
            !modalRef.current[index].contains(e.target)) {
            ModalManager_2.default.close(index);
        }
    };
    var refReducer = function (index, value) {
        modalRef.current[index] = value;
    };
    return (activeModals.length !== 0 &&
        activeModals.map(function (Component, i) {
            var Modal = Component;
            return (react_1.default.createElement(react_1.default.Fragment, null, CustomComponent ? (react_1.default.createElement(CustomComponent, __assign({ key: i }, data[i]))) : (react_1.default.createElement("div", { key: i, className: "backdrop_modal_manager", onClick: function (e) {
                    handleCloseModal(i, e);
                } },
                react_1.default.createElement("div", { ref: function (ref) {
                        refReducer(i, ref);
                    } },
                    react_1.default.createElement(Modal, __assign({ key: i }, data[i])))))));
        }));
};
exports.default = ModalProvider;
