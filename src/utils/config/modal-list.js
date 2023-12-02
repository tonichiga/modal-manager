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
Object.defineProperty(exports, "__esModule", { value: true });
exports.setModalList = void 0;
var modalList = {};
var setModalList = function (_modalList) {
    modalList = __assign(__assign({}, modalList), _modalList);
};
exports.setModalList = setModalList;
exports.default = modalList;
