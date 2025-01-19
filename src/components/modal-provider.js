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
var react_dom_1 = require("react-dom");
var ModalProvider = function (_a) {
    var modalList = _a.modalList, isOverflow = _a.isOverflow, className = _a.className, backdropClassName = _a.backdropClassName, onModalStateChange = _a.onModalStateChange;
    var _b = (0, react_1.useState)([]), data = _b[0], setData = _b[1];
    var _c = (0, react_1.useState)([]), names = _c[0], setNames = _c[1];
    var modalRef = (0, react_1.useRef)([]);
    var applyCloseStyles = function (index) {
        return new Promise(function (resolve) {
            var modal = document.querySelector("[data-index=\"".concat(index, "\"]"));
            if (!modal)
                return;
            modal.classList.add("closing");
            setTimeout(function () {
                resolve(true);
            }, 150);
        });
    };
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
        var handleClose = function (position) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("position", position);
                        return [4 /*yield*/, applyCloseStyles(position)];
                    case 1:
                        _a.sent();
                        if (isOverflow) {
                            if (typeof document !== "undefined") {
                                document.body.style.overflow = "";
                            }
                        }
                        if (position === "all") {
                            setData([]);
                            setNames([]);
                            return [2 /*return*/];
                        }
                        if (position === -1) {
                            // remove last
                            setData(function (prev) {
                                return prev.filter(function (_, index) { return index !== prev.length - 1; });
                            });
                            setNames(function (prev) {
                                return prev.filter(function (_, index) { return index !== prev.length - 1; });
                            });
                            return [2 /*return*/];
                        }
                        if (position === 0) {
                            // remove first
                            setData(function (prev) { return prev.filter(function (_, index) { return index !== 0; }); });
                            setNames(function (prev) { return prev.filter(function (_, index) { return index !== 0; }); });
                            return [2 /*return*/];
                        }
                        // remove position index
                        setData(function (prev) {
                            return prev.filter(function (_, index) { return index !== prev.length - 1; });
                        });
                        setNames(function (prev) {
                            return prev.filter(function (_, index) { return index !== prev.length - 1; });
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        ModalManager_1.default.addEventListener(ModalManager_1.constants.CHANGE, handleOpenModal);
        ModalManager_1.default.addEventListener(ModalManager_1.constants.CLOSE, handleClose);
        return function () {
            ModalManager_1.default.removeEventListener(ModalManager_1.constants.CHANGE, handleOpenModal);
            ModalManager_1.default.removeEventListener(ModalManager_1.constants.CLOSE, handleClose);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    var activeModals = names.map(function (name) {
        var Component = modalList[name] || (function () { return react_1.default.createElement(react_1.default.Fragment, null); });
        return Component;
    });
    var handleCloseModal = function (index) {
        ModalManager_1.default.close(index);
    };
    var refReducer = function (index, value) {
        modalRef.current[index] = value;
    };
    if (typeof window === "undefined")
        return null;
    var body = document.body;
    (0, react_dom_1.createPortal)(react_1.default.createElement(react_1.default.Fragment, null, data.length !== 0 &&
        data.map(function (item, i) {
            var Modal = activeModals[i] || (function () { return react_1.default.createElement(react_1.default.Fragment, null); });
            return (react_1.default.createElement("div", { "data-index": i, key: item.modalId, className: "modal-manager backdrop_modal_manager ".concat(backdropClassName) },
                react_1.default.createElement("div", { onClick: function (e) {
                        e.stopPropagation();
                        handleCloseModal(i);
                    }, className: "backdrop" }),
                react_1.default.createElement("div", { className: "".concat(className, " modal_paper") },
                    react_1.default.createElement("div", { ref: function (ref) {
                            refReducer(i, ref);
                        } },
                        react_1.default.createElement(Modal, __assign({}, item.data))))));
        })), body);
    return null;
};
exports.default = ModalProvider;
