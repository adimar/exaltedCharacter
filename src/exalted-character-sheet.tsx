import * as React from "react";
import * as redux from "redux";
import { connect } from "react-redux";
import {AggregateDataStore} from "./datastore/aggregate-datastore";
import {DotSliderElement} from "./components/element-dot-slider/dot-slider-element";

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
            <DotSliderElement visibleDots="3"/>
            </div>




    }
}



export const ExaltedCharacterSheet: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_ExaltedCharacterSheet)