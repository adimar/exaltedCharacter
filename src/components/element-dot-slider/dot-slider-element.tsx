import * as React from "react";
import * as redux from "redux";
import {connect} from "react-redux";
import * as _ from "lodash";
import * as styles from "./dot-slider-element.css";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import {SystemDataStore} from "../../datastore/system-static-store/system-data-store";
import {Action} from "redux";

export interface OwnProps {

    dataPath: string;
    itemId: string;
    titleProperty: string;
    setItemAction:(itemId:string, value:number)=>Action
    visibleDots : number;
    maxDots? : number;
}

interface ConnectedState {
    title: string;
    value: number;
}

interface ConnectedDispatch {
    callDispatchFunction: (value: number, props: OwnProps & ConnectedState) => void;
}


const mapStateToProps = (state:AggregateDataStore, ownProps: OwnProps): ConnectedState => {
    let characterDataStoreNode = _.get(state.character,ownProps.dataPath)[ownProps.itemId]
    let systemDataStoreNode = _.get(SystemDataStore,ownProps.dataPath)[ownProps.itemId];
    let title:string  = systemDataStoreNode[ownProps.titleProperty];
    let value:number =  characterDataStoreNode.value;

    return {
        title: title,
        value: value
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>): ConnectedDispatch => ({
    callDispatchFunction: (value: number, props: OwnProps & ConnectedState) => {
        dispatch(props.setItemAction(props.itemId, value));
    }
});


class _dotSliderElement extends React.Component<OwnProps & ConnectedState & ConnectedDispatch, {}> {


    _selectDot = (ev,i)=>{
        console.log("item:"+this.props.itemId+", selectDot:"+i);
        this.props.callDispatchFunction(i, this.props);
    }

    render() {
        const {visibleDots,maxDots,title,value} = this.props;

        let dotArray = [];
        for(let i=0;i<visibleDots;i++) {
            let classNameValue = styles.dot +" ";
            let onClickValue;
            if(i<value) {
                classNameValue+=styles.dotFull;
                onClickValue  = (e)=>{this._selectDot(e, i+1)};
            } else if(i< (maxDots||visibleDots)) {
                classNameValue+=styles.dotEmpty;
                onClickValue  = (e)=>{this._selectDot(e, i+1)};
            } else {
                classNameValue+=styles.dotInactive;
                onClickValue=()=>{};
            }

            let dot = <span key={"dot"+i} className={classNameValue} onClick={onClickValue}/>
            dotArray.push(dot);
        }
        return <span className={styles.dotSliderElement}>
            <label className={styles.labelSpan}>{title}</label>
            <span className={styles.dotSpan}>{dotArray}</span>
        </span>
    }
}


export const DotSliderElement: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(_dotSliderElement);