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
import {InputSpinner} from "../common/input-spinner";

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

    _onAttributeUp = (originalValue:number):void =>{
        let props = this.props;
        let nextStepCost = props.costPerRaise||0*props.raiseStep||1;
        if(originalValue+ nextStepCost <= 10*props.costPerRaise) {
            this.props.setAttribute(originalValue+nextStepCost,props);
        }
    }

    _onAttributeDown = (originalValue:number):void =>{
        let props = this.props;
        let nextStepCost = props.costPerRaise||0*props.raiseStep||1;
        if(originalValue-nextStepCost >= -5*props.costPerRaise) {
            this.props.setAttribute(originalValue-nextStepCost,props);
        }
    }


    render() {
        const {name, value, cost, costPerRaise} = this.props;



        let attributeCostElement: any = "";

        if (costPerRaise) {
            attributeCostElement =
                <label className={styles.attributeCost +" "+styles.squareBrackets}>
                        <InputSpinner value={cost}
                                  className={styles.attributeInputSpinner }
                                  clickUpCall={this._onAttributeUp.bind(this)}
                                  clickDownCall={this._onAttributeDown.bind(this)}/>
                </label>
        }
        return (
            <div className={styles.attributeElement}>
                 <Textfit  className={styles.attributeName} mode="multi">
                     {name}
                 </Textfit>
                <label className={styles.attributeValueBox}>{value}</label>
                {attributeCostElement}
            </div>);


    }
}


export const AttributeElement: React.ComponentClass<AttributeElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_AttributeElement);