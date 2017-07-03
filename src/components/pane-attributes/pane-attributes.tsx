import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import { AttributeElement} from "../attribute-element/attribute-element";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import * as styles from "./pane-attributes.css";
export interface AttributePaneProps {}

interface ConnectedState {}

interface ConnectedDispatch {}

const mapStateToPropsAttributePane = (state: AggregateDataStore, ownProps: AttributePaneProps): ConnectedState => ({

})

const mapDispatchToPropsAttributePane = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({

})



class _AttributesPane extends React.Component<{} , {}> {



    render () {

        return <div className={styles.attributesPane}>
            <div className={styles.primaryAttributes}>
                <AttributeElement attributeId="st"/>
                <AttributeElement attributeId="dx"/>
                <AttributeElement attributeId="iq"/>
                <AttributeElement attributeId="ht"/>
            </div>
            <div className={styles.derivedAttributes}>
                <AttributeElement attributeId="hp"/>
                <AttributeElement attributeId="will"/>
                <AttributeElement attributeId="per"/>
                <AttributeElement attributeId="fp"/>

            </div>
            <div className={styles.derivedAttributes}>

                <AttributeElement attributeId="strike"/>
                <AttributeElement attributeId="speed"/>
                <AttributeElement attributeId="move"/>

            </div>
            <AttributeElement attributeId="dodge"/>
            <AttributeElement attributeId="bl"/>
        </div>
    }
}



export const AttributesPane: React.ComponentClass<AttributePaneProps> =
    connect(mapStateToPropsAttributePane, mapDispatchToPropsAttributePane)(_AttributesPane)