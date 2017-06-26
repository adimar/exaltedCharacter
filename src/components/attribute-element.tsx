import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import * as styles from "./attribute-element.css";
import {GurpsDataStore} from "../datastore/gurps-char-gen-datastore";
import {setPrimaryAttribute} from "../actions/attribute-action-factory";

export interface AttributeElementProps {
    attributeId:string;
}


interface ConnectedState {
    name: string;
    value: number;
    cost: number;
}

interface ConnectedDispatch {
    setAttribute: (attributeId:string, value: number) => void;
}

const mapStateToProps = (state: GurpsDataStore.All, ownProps: AttributeElementProps): ConnectedState => {
    let attributeId = ownProps.attributeId;
    let costPerRaise = state.system.attributes[ownProps.attributeId].costPerRaise;

    let attributeBase = state.system.attributes[attributeId].base;
    let attributeValue = state.character.attributes[attributeId].value || attributeBase;
    let cost = (attributeValue-attributeBase) * costPerRaise;
    console.log("attributeBase:"+attributeBase);
    console.log("attributeValue:"+attributeValue);
    return {
        name: state.system.attributes[attributeId].name,
        value: attributeValue,
        cost: cost,
    };
};

const mapDispatchToProps = (dispatch: redux.Dispatch<GurpsDataStore.All>): ConnectedDispatch => ({
    setAttribute: (attributeId:string, value: number) => {
        dispatch(setPrimaryAttribute(attributeId,value));
    }
})



class _AttributeElement extends React.Component<ConnectedState & ConnectedDispatch & AttributeElementProps , {}> {

    _onSetAttribute = (event : React.ChangeEvent<HTMLTextAreaElement>)=>{
        this.props.setAttribute(this.props.attributeId, Number(event.target.value));
    }

    render () {
        const {name, value, cost, attributeId} = this.props;
        return <div className={styles.attributeElement}>
            <label className={styles.attributeName}>{name}</label>
            <input className={styles.attributeValueBox} onChange={this._onSetAttribute.bind(this)} type="text" value={value}/>
            <label className={styles.squareBrackets} type="text" ></label>
            <input className={styles.attributeCostBox} onChange={this._onSetAttribute.bind(this)} type="text" value={cost}/>
        </div>
    }


}



export const AttributeElement: React.ComponentClass<AttributeElementProps> =
    connect(mapStateToProps, mapDispatchToProps)(_AttributeElement);