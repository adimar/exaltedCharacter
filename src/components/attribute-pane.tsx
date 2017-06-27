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

const mapStateToPropsAttributePane = (state: GurpsDataStore.All, ownProps: AttributePaneProps): ConnectedState => ({

})

const mapDispatchToPropsAttributePane = (dispatch: redux.Dispatch<GurpsDataStore.All>): ConnectedDispatch => ({

})



class _AttributesPane extends React.Component<{} , {}> {



    render () {

        return <div>

            <AttributeElement attributeId="st"/><br/>
            <AttributeElement attributeId="dx"/><br/>
            <AttributeElement attributeId="iq"/><br/>
            <AttributeElement attributeId="ht"/><br/>
            <AttributeElement attributeId="hp"/><br/>
            <AttributeElement attributeId="will"/><br/>
            <AttributeElement attributeId="per"/><br/>
            <AttributeElement attributeId="fp"/><br/>
        </div>
    }
}



export const AttributesPane: React.ComponentClass<AttributePaneProps> =
    connect(mapStateToPropsAttributePane, mapDispatchToPropsAttributePane)(_AttributesPane)