import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import * as styles from "./attribute-element.css";
import {GurpsDataStore} from "../datastore/gurps-char-gen-datastore";
import {setDerivedAttribute, setPrimaryAttribute} from "../actions/attribute-action-factory";
import {attributeValueBox} from "./attribute-element.css";

export interface AttributeElementProps {
    attributeId:string;
}


interface ConnectedState {
    name: string;
    value: number;
    cost: number;
    attributeCostBoxStyle: string;
    attributeValueBoxStyle: string;
    isDerived: boolean,
    costPerRaise: number
}

interface ConnectedDispatch {
    setAttribute: (isDerived:boolean, attributeId:string, value: number) => void;
}

const mapStateToProps = (state: GurpsDataStore.All, ownProps: AttributeElementProps): ConnectedState => {
    let attributeId = ownProps.attributeId;
    var systemAttribute =  state.system.attributes[attributeId];
    var characterAttribute = state.character.attributes[attributeId];
    let isDerived = (systemAttribute.derived?true:false);
    let costPerRaise = systemAttribute.costPerRaise;

    let cost;
    let value;
    let attributeValueBoxStyle = styles.attributeValueBox;
    let attributeCostBoxStyle = styles.attributeCostBox;

    if(isDerived) {
        cost = characterAttribute.cost;
        let baseValue =   state.character.attributes[systemAttribute.derived].value || state.system.attributes[systemAttribute.derived].base;
        value = baseValue + Math.floor(cost/costPerRaise);
        attributeValueBoxStyle+=(" "+styles.activeAttributeTextbox);
        attributeCostBoxStyle+=(" "+styles.inactiveAttributTextbox);
    } else {
        value = characterAttribute.value || systemAttribute.base;
        cost = (value-systemAttribute.base) * costPerRaise;
        attributeCostBoxStyle+=(" "+styles.activeAttributeTextbox);
        attributeValueBoxStyle+=(" "+styles.inactiveAttributTextbox);
    }


    return {
        name: state.system.attributes[attributeId].name,
        value: value,
        cost: cost,
        attributeCostBoxStyle: attributeCostBoxStyle,
        attributeValueBoxStyle: attributeValueBoxStyle,
        isDerived: isDerived,
        costPerRaise:costPerRaise,
    };
};

const mapDispatchToProps = (dispatch: redux.Dispatch<GurpsDataStore.All>): ConnectedDispatch => ({
    setAttribute: (isDerived:boolean, attributeId:string, n: number) => {
        if(isDerived) {
            dispatch(setDerivedAttribute(attributeId,n));
        } else {
            dispatch(setPrimaryAttribute(attributeId,n));
        }
    }
});



class _AttributeElement extends React.Component<ConnectedState & ConnectedDispatch & AttributeElementProps , {}> {

    _onSetAttribute = (event : React.ChangeEvent<HTMLTextAreaElement>)=>{
        this.props.setAttribute(this.props.isDerived, this.props.attributeId, Number(event.target.value));
    };

    render () {
        const {name, value, cost, attributeId,attributeValueBoxStyle,attributeCostBoxStyle,isDerived,costPerRaise} = this.props;
        return <div className={styles.attributeElement}>
            <label className={styles.attributeName}>{name}</label>
            <input className={attributeValueBoxStyle}
                   onChange={this._onSetAttribute.bind(this)}
                   type="number" value={value}
                   min="1"
                   max="20"
                   disabled={isDerived}/>
            <label className={styles.squareBrackets} type="text" ></label>
            <input className={attributeCostBoxStyle}
                   onChange={this._onSetAttribute.bind(this)}
                   type="number"
                   value={cost}
                   disabled={!isDerived}
                   min="-100"
                   max="100"
                   step={costPerRaise}
            />
        </div>
    }


}



export const AttributeElement: React.ComponentClass<AttributeElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_AttributeElement);