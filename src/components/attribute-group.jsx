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
var attribute_pane_1 = require("./attribute-pane");
var mapStateToProps = function (state, ownProps) { return ({}); };
var mapDispatchToProps = function (dispatch) { return ({}); };
var AttributeGroup = (function (_super) {
    __extends(AttributeGroup, _super);
    function AttributeGroup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AttributeGroup.prototype.render = function () {
        return <div>

            <attribute_pane_1.AttributePane name="ST" value="10" cost="0"/><br />
            <attribute_pane_1.AttributePane name="DX" value="11" cost="1"/><br />
            <attribute_pane_1.AttributePane name="IQ" value="13" cost="2"/><br />
            <attribute_pane_1.AttributePane name="HT" value="14" cost="3"/><br />
        </div>;
    };
    return AttributeGroup;
}(React.Component));
exports.AttributeGroupPane = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(AttributeGroup);
