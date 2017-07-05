

import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {AttributeElement} from "../attribute-element/attribute-element";
import {SystemDataAggregators} from "../../datastore/data-aggregators/system-data-aggregators";
import {AttributeIdConsts} from "../../datastore/system-static-store/system-attributes-store";


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


    let strike = SystemDataAggregators.attributes(state,AttributeIdConsts.strike);
    let strikeDamage =  SystemDataStore.attributes.st.data.damage[strike.value];


    let cs :CalculatedStatsConnectedState = {
        basicLift: SystemDataAggregators.attributes(state,AttributeIdConsts.bl).value,
        damageThr: strikeDamage.thrust,
        damageSw: strikeDamage.swing,
        basicSpeed:  SystemDataAggregators.attributes(state,AttributeIdConsts.speed).value,
        basicMove: SystemDataAggregators.attributes(state,AttributeIdConsts.speed).value,
        dodge:  SystemDataAggregators.attributes(state,AttributeIdConsts.dodge).value
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