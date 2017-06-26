import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import { AttributeElement} from "./attribute-element";
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



class _AttributePane extends React.Component<{} , {}> {



    render () {

        return <div>

            <AttributeElement attributeId="st"/><br/>
            <AttributeElement attributeId="dx"/><br/>
            <AttributeElement attributeId="iq"/><br/>
            <AttributeElement attributeId="ht"/><br/>
        </div>
    }
}



export const AttributePane: React.ComponentClass<AttributePaneProps> =
    connect(mapStateToPropsAttributePane, mapDispatchToPropsAttributePane)(_AttributePane)