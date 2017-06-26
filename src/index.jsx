"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReactDOM = require("react-dom");
var react_redux_1 = require("react-redux");
var Redux = require("redux");
var React = require("react");
var counter_reducers_1 = require("./reducers/counter-reducers");
var attribute_group_1 = require("./components/attribute-group");
var myStore = Redux.createStore(counter_reducers_1.CounterReducer);
ReactDOM.render(<react_redux_1.Provider store={myStore}>
        <attribute_group_1.AttributeGroupPane />
    </react_redux_1.Provider>, document.body);
