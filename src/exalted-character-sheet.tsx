import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {AggregateDataStore} from "./datastore/aggregate-datastore";
import {AttributesPane} from "./components/pane-attributes/attributes-pane";
import {BonusPointsPane} from "./components/pane-bonus-points/bonus-points-pane";


export interface OwnProps {

}

interface ConnectedState {}

interface ConnectedDispatch {}


const mapStateToProps = (state: AggregateDataStore, ownProps: OwnProps): ConnectedState => ({

})

const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({

})



class _ExaltedCharacterSheet extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {



    render () {

        return <div>
            <AttributesPane/>
            <BonusPointsPane/>
            </div>




    }
}



export const ExaltedCharacterSheet: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_ExaltedCharacterSheet)