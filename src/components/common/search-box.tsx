import * as React from "react";
import * as redux from "redux";
import {AggregateDataStore} from "../../datastore/aggregate-datastore";
import * as styles from "./search-box.css";
import {connect} from "react-redux";
import {getMatching, registerSearchBox} from "../../actions/search-box-action-factory";
import {SearchIdValuePair} from "../../datastore/character-store/misc-store";
import * as _ from "lodash";

export interface SearchBoxProps {
    searchBoxId: string;
    dataPath: string;
    valueField: string;
    idField: string;
}

interface ConnectedState {
    matches: object[];
}

interface ConnectedDispatch {
    getMatching: (pattern: string, props: SearchBoxProps & ConnectedState) => void;
    registerSearchBox: (props: SearchBoxProps) => void;

}

const mapStateToProps = (state: AggregateDataStore, ownProps: SearchBoxProps): ConnectedState => {
    let searchBoxState = state.misc.searchElement[ownProps.searchBoxId] || {matches: []};


    return {
        matches: searchBoxState.matches
    };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>) => ({
    getMatching: (pattern: string, props: SearchBoxProps & ConnectedState) => {
        console.log("SearchBox.getMatching value:" + pattern + ", attribute:" + props);
        dispatch(getMatching(props.searchBoxId, pattern));
    },
    registerSearchBox: (props: SearchBoxProps) => {
        console.log("SearchBox.registerSearchBox searchBox:" + props);
        dispatch(registerSearchBox(props.searchBoxId, props.dataPath, props.valueField, props.idField));
    },
});


class _SearchBox extends React.Component<ConnectedState & ConnectedDispatch & SearchBoxProps, {}> {
    private _scrollBarIndex: number = 0;

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

        if (event.deltaY > 0 && this._scrollBarIndex < _.size(this.props.matches) - 11  ) {
            this._scrollBarIndex++;
        } else if (event.deltaY < 0 && this._scrollBarIndex > 0) {
            this._scrollBarIndex--;
        }
        this.forceUpdate();
    }

    render() {
        const {matches} = this.props;
        var matchingItemsBase = (this._scrollBarIndex ?
            [<div key="search_start_overflow" className={styles.searchDropDownOverflow}>
                {this._scrollBarIndex} previous items...</div>] : []);
        var matchingItems = _.chain(matches).slice(this._scrollBarIndex, this._scrollBarIndex + 10)
            .reduce((accumulator, matchItem: SearchIdValuePair) => {
                var spanKey = "search_" + matchItem.id;
                accumulator.push(<div key={spanKey} className={styles.searchDropDownLine}>{matchItem.value}</div>);
                return accumulator;
            }, matchingItemsBase).value();
        let resultDisplayedSizeDiff: number = _.size(matches) - _.size(matchingItems) - this._scrollBarIndex;
        if (resultDisplayedSizeDiff > 0) {
            matchingItems.push(<div key="search_end_overflow" className={styles.searchDropDownOverflow}>
                ...{resultDisplayedSizeDiff} following items</div>);
        }


        return <div className={styles.searchBox}>
            <input className={styles.searchBoxText} type="text" onChange={this._onSearchboxChanged.bind(this)}/>
            <div className={styles.searchDropDown} onWheel={this._onWheelSearchBox.bind(this)}>{matchingItems}</div>
        </div>;
    }
}

export const SearchBox: React.ComponentClass<SearchBoxProps> =
    connect(mapStateToProps, mapDispatchToProps)(_SearchBox);