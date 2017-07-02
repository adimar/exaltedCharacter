import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {AggregateDataStore} from "./datastore/aggregate-datastore";
import {AttributesPane} from "./components/attribute-pane";
import {CalculatedStats} from "./components/calculated-stats/calculated-stats-element";

export interface GurpsCharacterSheetProps {

}

interface ConnectedState {}

interface ConnectedDispatch {}


const mapStateToPropsGurpsCharacterSheet = (state: AggregateDataStore, ownProps: GurpsCharacterSheetProps): ConnectedState => ({

})

const mapDispatchToPropsGurpsCharacterSheet = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({

})



class _GurpsCharacterSheet extends React.Component<{} , {}> {



    render () {

        return <div>
            Attributes:
            <AttributesPane/>

            <CalculatedStats/>
        </div>
    }
}



export const GurpsCharacterSheet: React.ComponentClass<GurpsCharacterSheetProps> =
    connect(mapStateToPropsGurpsCharacterSheet, mapDispatchToPropsGurpsCharacterSheet)(_GurpsCharacterSheet)