import * as React from "react";
import * as redux from "redux";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import * as styles from "./search-box.css";
import {connect} from "react-redux";
import { getMatching, registerSearchBox, selectSearchBoxItem, selectSearchBoxItemArguments} from "../../actions/search-box-action-factory";

import * as _ from "lodash";

export interface SearchBoxProps {
    searchBoxId: string;
    dataPath: string;
    valueField: string;
    idField: string;
    itemDisplayCalculator?: (searchItem:any)=>string
    itemSelectionDispatch: (selectedSearchItem:any)=>void
    excludePath?: string;

}

interface ConnectedState {
    matches: {};
    searchBoxPattern: string;
}

interface ConnectedDispatch {
    getMatching: (pattern: string, props: SearchBoxProps & ConnectedState) => void;
    registerSearchBox: (props: SearchBoxProps) => void;
    selectSearchItem: (props: SearchBoxProps, selectedSearchItem: any) => void;

}

const mapStateToProps = (state: AggregateDataStore, ownProps: SearchBoxProps): ConnectedState => {
    let searchBoxState = state.misc.searchElement[ownProps.searchBoxId] || {matches: [],searchBoxPattern:""};


    return {
        matches: searchBoxState.matches,
        searchBoxPattern: searchBoxState.searchBoxPattern
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>) => ({
    getMatching: (pattern: string, props: SearchBoxProps & ConnectedState) => {
        console.log("SearchBox.getMatching value:" + pattern + ", attribute:" + props);
        dispatch(getMatching(props.searchBoxId, pattern));
    },
    registerSearchBox: (props: SearchBoxProps) => {
        console.log("SearchBox.registerSearchBox searchBox:" + props);
        dispatch(registerSearchBox(props.searchBoxId, props.dataPath, props.valueField, props.idField,props.excludePath));
    },
    selectSearchItem: (props: SearchBoxProps, selectedSearchItem: any) => {
        console.log("SearchBox.selectSearchItem searchBox:" + props+" selectedSearchItem:"+selectedSearchItem);

        dispatch(selectSearchBoxItem(props.searchBoxId,selectedSearchItem, props.itemSelectionDispatch));
    }
});


class _SearchBox extends React.Component<ConnectedState & ConnectedDispatch & SearchBoxProps, {}> {
    private _scrollBarIndex: number = 0;
    private _dropDownVisible: boolean =  false;
    constructor(props: SearchBoxProps & ConnectedState & ConnectedDispatch) {
        super(props);
        props.registerSearchBox(props);
    }

    _onSearchboxChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        var txt = event.target.value;
        let props = this.props;
        this._scrollBarIndex = 0;
        props.getMatching(txt, props);
    }

    _onWheelSearchBox = (event: React.WheelEvent<any>) => {

        if (event.deltaY > 0 && this._scrollBarIndex < _.size(this.props.matches) - 11) {
            this._scrollBarIndex++;
        } else if (event.deltaY < 0 && this._scrollBarIndex > 0) {
            this._scrollBarIndex--;
        }
        event.preventDefault();
        this.forceUpdate();
    }

    _onMouseEnterLeave = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.type === "mouseleave") {
          this._dropDownVisible = false;
        } else if (event.type === "mouseenter" ) {
            this._dropDownVisible = true;
        }
        this.forceUpdate();
    }

    _onSelectSearchItem = (event: React.MouseEvent<HTMLDivElement>, selectedSearchItem: any)=> {
            this.props.selectSearchItem(this.props,selectedSearchItem);
    }

    render() {
        const {matches,idField,valueField,itemDisplayCalculator,searchBoxPattern} = this.props;

        var matchingItemsBase = (this._scrollBarIndex ?
            [<div key="search_start_overflow" className={styles.searchDropDownOverflow}>
                {this._scrollBarIndex} previous items...</div>] : []);

        var matchingItems = _.chain(matches).values()
            .slice(this._scrollBarIndex, this._scrollBarIndex + 10 + (this._scrollBarIndex ? 0 : 1))
            .reduce((accumulator, matchItem) => {
                var spanKey = "search_" + matchItem[idField];
                var  searchItemValue = (itemDisplayCalculator?itemDisplayCalculator(matchItem):matchItem[valueField]);
                accumulator.push(<div key={spanKey} className={styles.searchDropDownLine} onClick={(e)=>{this._onSelectSearchItem(e, matchItem)}}>{searchItemValue}</div>);
                return accumulator;
            }, matchingItemsBase).value();
        let resultDisplayedSizeDiff: number = _.size(matches) - _.size(matchingItems) - this._scrollBarIndex;
        if (resultDisplayedSizeDiff > 0) {
            matchingItems.push(<div key="search_end_overflow" className={styles.searchDropDownOverflow}>
                ...{resultDisplayedSizeDiff} following items</div>);
        }


        return <div className={styles.searchBox} onMouseLeave={this._onMouseEnterLeave.bind(this)}
                    onMouseEnter={this._onMouseEnterLeave.bind(this)}>
            <input className={styles.searchBoxText} type="text" onChange={this._onSearchboxChanged.bind(this)} value={searchBoxPattern}/>
            {this._dropDownVisible && <div className={styles.searchDropDown} onWheel={this._onWheelSearchBox.bind(this)} >{matchingItems}</div>}
        </div>;
    }
}

export const SearchBox: React.ComponentClass<SearchBoxProps> =
    connect(mapStateToProps, mapDispatchToProps)(_SearchBox);