import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import { AttributeElement} from "./attribute-element/attribute-element";
import {GurpsDataStore} from "../datastore/gurps-char-gen-datastore";

export interface AttributePaneProps {

}

interface ConnectedState {

}

interface ConnectedDispatch {

}

const mapStateToPropsAttributePane = (state: GurpsDataStore, ownProps: AttributePaneProps): ConnectedState => ({

})

const mapDispatchToPropsAttributePane = (dispatch: redux.Dispatch<GurpsDataStore>): ConnectedDispatch => ({

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
            <AttributeElement attributeId="strk"/>
        </div>
    }
}



export const AttributesPane: React.ComponentClass<AttributePaneProps> =
    connect(mapStateToPropsAttributePane, mapDispatchToPropsAttributePane)(_AttributesPane)