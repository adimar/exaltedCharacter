"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var action_factory_1 = require("../actions/action-factory");
var mapStateToProps = function (state, ownProps) { return ({
    counter: state.counter,
}); };
var mapDispatchToProps = function (dispatch) { return ({
    increment: function (n) {
        dispatch(action_factory_1.incrementCounter(n));
    },
}); };
var CounterComponent = (function (_super) {
    __extends(CounterComponent, _super);
    function CounterComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._onClickIncrement = function () {
            _this.props.increment(1);
        };
        return _this;
    }
    CounterComponent.prototype.render = function () {
        var _a = this.props, counter = _a.counter, label = _a.label;
        return <div>
            <label>{label}</label>
            <pre>counter = {counter.value}</pre>
            <button ref="increment" onClick={this._onClickIncrement}>click me!</button>
        </div>;
    };
    return CounterComponent;
}(React.Component));
exports.Counter = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(CounterComponent);
