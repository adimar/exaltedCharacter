import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import {Textfit} from 'react-textfit';
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {setDerivedAttribute, setPrimaryAttribute} from "../../actions/attribute-action-factory";
import * as _ from "lodash";

import * as styles from "./attribute-element.css";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {SystemDataAggregators} from "../../datastore/data-aggregators/system-data-aggregators";

export interface AttributeElementProps {
    attributeId: string;
}


interface ConnectedState {
    name: string;
    value: number;
    cost: number;
    isDerived: boolean,
    costPerRaise: number
    raiseStep: number;
}

interface ConnectedDispatch {
    setAttribute: (cost: number, props: AttributeElementProps & ConnectedState) => void;
}

const mapStateToProps = (state: AggregateDataStore, ownProps: AttributeElementProps): ConnectedState => {
    let attributeId = ownProps.attributeId;
    var systemAttribute = SystemDataStore.attributes[attributeId];
    var characterAttribute = state.character.attributes[attributeId];
    let isDerived = (systemAttribute.derived ? true : false);
    let costPerRaise = systemAttribute.costPerRaise;
    let raiseStep = systemAttribute.raiseStep || 1;
    let cost;
    let value;

    let attributeAggregator = SystemDataAggregators.attributes(state, attributeId);
    if (costPerRaise) {
        cost = characterAttribute.cost;
        value = attributeAggregator.value;

    } else {
        cost = null;
        value = attributeAggregator.base;
    }

    return {
        name: SystemDataStore.attributes[attributeId].name,
        value: value,
        cost: cost,
        isDerived: isDerived,
        costPerRaise: costPerRaise,
        raiseStep: raiseStep,
    };
};

const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    setAttribute: (n: number, props: AttributeElementProps & ConnectedState) => {
        console.log("AttributeElement.etAttribute value:" + n + ", attribute:" + props.attributeId);
        dispatch(setDerivedAttribute(props.attributeId, n));
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
        const {name, value, cost, attributeId, isDerived, costPerRaise, raiseStep} = this.props;


        let attributeValueElement: any;
        let attributeCostElement: any;

        if (costPerRaise) {
            attributeValueElement =
                <label className={styles.attributeValueBox}>{value}</label>;
            attributeCostElement =
                <label className={styles.squareBrackets}>
                    <input
                        className={styles.attributeCostBox}
                        onChange={this._onAttributeChange.bind(this)}
                        type="number"
                        value={cost}
                        min={-5*costPerRaise}
                        max={10*costPerRaise}
                        step={costPerRaise}
                        onKeyPress={(evt)=>evt.preventDefault()}/>
                </label>
        } else {
            attributeValueElement =
                <label className={styles.attributeValueBox}>{value}</label>;
            attributeCostElement = "";
        }


        return (
            <div className={styles.attributeElement}>
                 <Textfit  className={styles.attributeName} mode="multi">
                     {name}
                 </Textfit>
                {attributeValueElement}
                {/*<label className={styles.squareBrackets} type="text"></label>*/}
                {attributeCostElement}
            </div>);


    }
}


export const AttributeElement: React.ComponentClass<AttributeElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_AttributeElement);