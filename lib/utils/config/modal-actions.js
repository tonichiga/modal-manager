"use strict";

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setModalActions = void 0;
var modalActions = {};
var setModalActions = function setModalActions(actionList) {
  modalActions = __assign(__assign({}, modalActions), actionList);
};
exports.setModalActions = setModalActions;
exports["default"] = modalActions;