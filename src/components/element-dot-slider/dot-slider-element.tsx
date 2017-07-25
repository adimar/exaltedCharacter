import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./dot-slider-element.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";


export interface OwnProps {
    visibleDots : string;
}

interface ConnectedState {

}

interface ConnectedDispatch {

}


const mapStateToProps = (state:AggregateDataStore, ownProps: OwnProps): ConnectedState => {

    return {};
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({

});


class _dotSliderElement extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {
    private _value:number=3;


    _selectDot = (ev,i)=>{
        console.log("_selectDot:"+i);
        if(i===this._value && i>0) {
            i--;
        }
        this._value=i;
        this.forceUpdate();
    }
    render() {
        const {visibleDots} = this.props;
        let visibleDotCount = Number.parseInt(visibleDots);
        let dotArray = [];
        for(let i=0;i<visibleDotCount;i++) {

            let dot = <span key={"dot"+i} className={styles.dot +" "+ (i<this._value?styles.dotFull:styles.dotEmpty)}
                            onClick={(e)=>{this._selectDot(e, i+1)}}/>
            dotArray.push(dot);
        }
        return <span className={styles.dotSliderElement}>
            {dotArray}
        </span>
    }
}


export const DotSliderElement: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_dotSliderElement);