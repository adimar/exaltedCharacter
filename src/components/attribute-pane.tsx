import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import { AttributeElement} from "./attribute-element/attribute-element";
import {AggregateDataStore} from "../datastore/aggregate-datastore";

export interface AttributePaneProps {}

interface ConnectedState {}

interface ConnectedDispatch {}

const mapStateToPropsAttributePane = (state: AggregateDataStore, ownProps: AttributePaneProps): ConnectedState => ({

})

const mapDispatchToPropsAttributePane = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({

})



class _AttributesPane extends React.Component<{} , {}> {



    render () {

        return <div>

            <AttributeElement attributeId="st"/>
            <AttributeElement attributeId="dx"/>
            <AttributeElement attributeId="iq"/>
            <AttributeElement attributeId="ht"/>
            <AttributeElement attributeId="hp"/>
            <AttributeElement attributeId="will"/>
            <AttributeElement attributeId="per"/>
            <AttributeElement attributeId="fp"/>
            <AttributeElement attributeId="strike"/>
            <AttributeElement attributeId="speed"/>
            <AttributeElement attributeId="move"/>
        </div>
    }
}



export const AttributesPane: React.ComponentClass<AttributePaneProps> =
    connect(mapStateToPropsAttributePane, mapDispatchToPropsAttributePane)(_AttributesPane)