"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var str_enum_1 = require("../helpers/str-enum");
exports.ActionTypesConsts = str_enum_1.strEnum([
    "INCREMENT_COUNTER",
    "RESET_COUNTER"
]);
exports.incrementCounter = function (delta) { return ({
    type: exports.ActionTypesConsts.INCREMENT_COUNTER,
    delta: delta,
}); };
exports.resetCounter = function () { return ({
    type: exports.ActionTypesConsts.RESET_COUNTER,
}); };
