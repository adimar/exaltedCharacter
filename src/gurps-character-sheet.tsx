import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {AggregateDataStore} from "./datastore/aggregate-datastore";
import {AttributesPane} from "./components/pane-attributes/pane-attributes";
import {CalculatedStats} from "./components/calculated-stats/calculated-stats-element";
import {SkillsPane} from "./components/pane-skills/pane-skills";

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

            <SkillsPane/>
        </div>
    }
}



export const GurpsCharacterSheet: React.ComponentClass<GurpsCharacterSheetProps> =
    connect(mapStateToPropsGurpsCharacterSheet, mapDispatchToPropsGurpsCharacterSheet)(_GurpsCharacterSheet)