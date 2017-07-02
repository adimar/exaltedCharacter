

import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {AttributeElement} from "../attribute-element/attribute-element";


export interface CalculatedStatsSheetProps {

}

interface CalculatedStatsConnectedState {
    basicLift: number;
    damageThr: string;
    damageSw: string;
    basicSpeed: number;
    basicMove: number;
    dodge: number;
}

interface CalculatedStatsConnectedDispatch {}


const mapStateToPropsCalculatedStats = (state: AggregateDataStore, ownProps: CalculatedStatsSheetProps): CalculatedStatsConnectedState => {

    let stValue = state.character.attributes.st.value;
    let strikeValue = stValue + state.character.attributes.strike.cost/SystemDataStore.attributes.strike.costPerRaise;
    let strikeDamage =  SystemDataStore.attributes.st.data.damage[strikeValue];
    let cs :CalculatedStatsConnectedState = {
        basicLift: SystemDataStore.attributes.bl.derived.base(state),
        damageThr: strikeDamage.thrust,
        damageSw: strikeDamage.swing,
        basicSpeed:  SystemDataStore.attributes.speed.derived.base(state),
        basicMove:  SystemDataStore.attributes.move.derived.base(state),
        dodge:  SystemDataStore.attributes.dodge.derived.base(state)
    };

    return cs;
};

const mapDispatchToPropsCalculatedStats = (dispatch: redux.Dispatch<AggregateDataStore>): CalculatedStatsConnectedDispatch => ({

})


class _CalculatedStats extends React.Component<CalculatedStatsConnectedState & CalculatedStatsConnectedDispatch & CalculatedStatsSheetProps, {}> {




    render () {
        const {basicLift, damageThr, damageSw, basicSpeed, basicMove,dodge} = this.props;

        return <div>
            Damage Thrust: {damageThr} Swing: {damageSw} <br/>
            Basic Lift (ST x ST)/5: {basicLift} <br/>
            Dode: {dodge}
        </div>
    }
}



export const CalculatedStats: React.ComponentClass<CalculatedStatsSheetProps> =
    connect(mapStateToPropsCalculatedStats, mapDispatchToPropsCalculatedStats)(_CalculatedStats);