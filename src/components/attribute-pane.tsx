import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {DataStore} from "../datastore/character-store";
import { AttributeElement, AttributeProps} from "./attribute-element";

export interface AttributePaneProps {

}

interface ConnectedState {

}

interface ConnectedDispatch {

}

const mapStateToProps = (state: DataStore.All, ownProps: AttributePaneProps): ConnectedState => ({

})

const mapDispatchToProps = (dispatch: redux.Dispatch<DataStore.All>): ConnectedDispatch => ({

})



class _AttributePane extends React.Component<{} , {}> {



    render () {

        return <div>

            <AttributeElement name="ST" value="10" cost="0"/><br/>
            <AttributeElement name="DX" value="11" cost="1"/><br/>
            <AttributeElement name="IQ" value="13" cost="2"/><br/>
            <AttributeElement name="HT" value="14" cost="3"/><br/>
        </div>
    }
}



export const AttributePane: React.ComponentClass<AttributePaneProps> =
    connect(mapStateToProps, mapDispatchToProps)(_AttributePane)