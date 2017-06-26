import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {DataStore} from "../datastore/character-store";
import * as styles from "./attribute-pane.css";

export interface AttributeProps {
    name:string;
    value: string;
    cost: string;
}


interface ConnectedState {

}

interface ConnectedDispatch {

}

const mapStateToProps = (state: DataStore.All, ownProps: AttributeProps): ConnectedState => ({

})

const mapDispatchToProps = (dispatch: redux.Dispatch<DataStore.All>): ConnectedDispatch => ({

})



class AttributeComponent extends React.Component<AttributeProps , {}> {



    render () {
        const { name, value, cost } = this.props;
        return <div className={styles.attributePane}>
            <label className={styles.attributeName}>{name}</label>
            <input className={styles.attributeValueBox} type="text" value={value}/>
            <label className={styles.attributeCostSquareBrackets} type="text" ></label>
            <input className={styles.attributeCostBox} type="text" value={cost}/>
        </div>
    }
}



export const AttributePane: React.ComponentClass<AttributeProps> =
    connect(mapStateToProps, mapDispatchToProps)(AttributeComponent)