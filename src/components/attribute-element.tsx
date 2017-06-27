import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as styles from "./attribute-element.css";
import {GurpsDataStore} from "../datastore/gurps-char-gen-datastore";
import {setDerivedAttribute, setPrimaryAttribute} from "../actions/attribute-action-factory";
import * as _ from "lodash";

export interface AttributeElementProps {
    attributeId: string;
}


interface ConnectedState {
    name: string;
    value: number;
    cost: number;
    isDerived: boolean,
    costPerRaise: number
}

interface ConnectedDispatch {
    setAttribute: (value: number, props: AttributeElementProps & ConnectedState) => void;
}

const mapStateToProps = (state: GurpsDataStore.All, ownProps: AttributeElementProps): ConnectedState => {
    let attributeId = ownProps.attributeId;
    var systemAttribute = state.system.attributes[attributeId];
    var characterAttribute = state.character.attributes[attributeId];
    let isDerived = (systemAttribute.derived ? true : false);
    let costPerRaise = systemAttribute.costPerRaise;

    let cost;
    let value;


    if (isDerived) {
        cost = characterAttribute.cost;
        let baseValue = state.character.attributes[systemAttribute.derived].value || state.system.attributes[systemAttribute.derived].base;
        value = baseValue + Math.floor(cost / costPerRaise);

    } else {
        value = characterAttribute.value || systemAttribute.base;
        cost = (value - systemAttribute.base) * costPerRaise;
    }


    return {
        name: state.system.attributes[attributeId].name,
        value: value,
        cost: cost,
        isDerived: isDerived,
        costPerRaise: costPerRaise,
    };
};

const mapDispatchToProps = (dispatch: redux.Dispatch<GurpsDataStore.All>): ConnectedDispatch => ({
    setAttribute: (n: number, props: AttributeElementProps & ConnectedState) => {
        console.log("AttributeElement.etAttribute value:" + n + ", attribute:" + props.attributeId);
        if (props.isDerived) {
            dispatch(setDerivedAttribute(props.attributeId, n));
        } else {
            dispatch(setPrimaryAttribute(props.attributeId, n));
        }
    }
});


class _AttributeElement extends React.Component<ConnectedState & ConnectedDispatch & AttributeElementProps, {}> {
    constructor(props: AttributeElementProps & ConnectedState & ConnectedDispatch) {
        super(props);

    }


    _onAttributeChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        let value = Number(event.target.value);
        let props = this.props;
        props.setAttribute(value, props);
    };


    render() {
        const {name, value, cost, attributeId, isDerived, costPerRaise} = this.props;


        let attributeValueElement: any;
        let attributeCostElement: any;
        if (isDerived) {

            attributeValueElement =
                <label className={styles.attributeValueBox + " " + styles.inactiveAttributeTextbox}>{value}</label>;
            attributeCostElement =
                <input className={styles.attributeCostBox + " " + styles.activeAttributeTextbox}
                       onChange={this._onAttributeChange.bind(this)}
                       type="number"
                       value={cost}
                       disabled={!isDerived}
                       min="-30"
                       max="30"
                       pattern="^-?.{1,2}$"
                       step={costPerRaise}/>;
        } else {
            attributeValueElement =
                <input className={styles.attributeValueBox + " " + styles.activeAttributeTextbox}
                       onChange={this._onAttributeChange.bind(this)}
                       type="number" value={value}
                       min="1"
                       max="20"/>;
            attributeCostElement =
                <label className={styles.attributeCostBox + " " + styles.inactiveAttributeTextbox}>{cost}</label>;
        }


        return(
            <div className={styles.attributeElement}>
                <label className={styles.attributeName}>{name}</label>
                {attributeValueElement}
                <label className={styles.squareBrackets} type="text"></label>
                {attributeCostElement}
            </div>);


    }
}


export const AttributeElement: React.ComponentClass<AttributeElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_AttributeElement);