import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {DataStore} from "../datastore/character-store";
import { AttributePane, AttributeProps} from "./attribute-pane";

export interface AttributeGroupProps {

}

interface ConnectedState {

}

interface ConnectedDispatch {

}

const mapStateToProps = (state: DataStore.All, ownProps: AttributeGroupProps): ConnectedState => ({

})

const mapDispatchToProps = (dispatch: redux.Dispatch<DataStore.All>): ConnectedDispatch => ({

})



class AttributeGroup extends React.Component<{} , {}> {



    render () {

        return <div>

            <AttributePane name="ST" value="10" cost="0"/><br/>
            <AttributePane name="DX" value="11" cost="1"/><br/>
            <AttributePane name="IQ" value="13" cost="2"/><br/>
            <AttributePane name="HT" value="14" cost="3"/><br/>
        </div>
    }
}



export const AttributeGroupPane: React.ComponentClass<AttributeGroupProps> =
    connect(mapStateToProps, mapDispatchToProps)(AttributeGroup)