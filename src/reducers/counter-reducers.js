"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var character_store_1 = require("../datastore/character-store");
exports.CounterReducer = function (state, action) {
    if (state === void 0) { state = character_store_1.AllDatastoreInitialState; }
    switch (action.type) {
        case "INCREMENT_COUNTER":
            var value = state.counter.value;
            var newValue = value + action.delta;
            return Object.assign({}, state, { counter: { value: newValue } });
        case "RESET_COUNTER":
            return Object.assign({}, state, { counter: character_store_1.CounterDatastoreInitialState });
        default:
            return state;
    }
};
