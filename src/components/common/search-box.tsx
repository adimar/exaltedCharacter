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
  getMatching: (pattern:string, props: SearchBoxProps & ConnectedState) => void;
  registerSearchBox: (props:SearchBoxProps)=>void;

}

const mapStateToProps = (state: AggregateDataStore, ownProps: SearchBoxProps): ConnectedState => {
  let searchBoxState = state.misc.searchElement[ownProps.searchBoxId] || {matches:[]};


  return {
    matches:searchBoxState.matches
  };
}


const mapDispatchToProps = (dispatch: redux.Dispatch<AggregateDataStore>) => ({
  getMatching: (pattern: string, props: SearchBoxProps & ConnectedState) => {
    console.log("SearchBox.getMatching value:" + pattern + ", attribute:" + props);
    dispatch(getMatching(props.searchBoxId,pattern));
  },
  registerSearchBox: (props:SearchBoxProps)=>{
    console.log("SearchBox.registerSearchBox searchBox:" + props);
    dispatch(registerSearchBox(props.searchBoxId,props.dataPath,props.valueField, props.idField));
  },
});


class _SearchBox extends React.Component<ConnectedState & ConnectedDispatch & SearchBoxProps, {}> {
  private _scrollBarIndex:number = 0;

  constructor(props: SearchBoxProps & ConnectedState & ConnectedDispatch) {
    super(props);
    props.registerSearchBox(props);
  }

  _onSearchboxChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    var txt = event.target.value;
    let props = this.props;
    this._scrollBarIndex = 0;
    props.getMatching(txt,props);
  }

  _onWheelSearchBox = (event: React.WheelEvent<any>) => {

    if(event.deltaY>0 && this._scrollBarIndex<_.size(this.props.matches)-1) {
      this._scrollBarIndex++;
    } else if(event.deltaY<0 && this._scrollBarIndex>0) {
      this._scrollBarIndex--;
    }
    this.forceUpdate();
  }

  render() {
    const {matches} = this.props;
    var matchingItems = _.chain(matches).slice(this._scrollBarIndex,this._scrollBarIndex+10).map((matchItem:SearchIdValuePair)=>{
      var spanKey = "search_"+matchItem.id;
      return <div key={spanKey} className={styles.searchDropDownLine}>{matchItem.value}</div>; // <option value={matchItem.value} key={matchItem.id}/>
    }).value();
    let resultDisplayedSizeDiff:number = _.size(matches) - _.size(matchingItems);
    if(resultDisplayedSizeDiff>0) {
      var extraResultItems = "..."+resultDisplayedSizeDiff+" results were not displayed.";
      matchingItems.push(<div key="search_overflow" className={styles.searchDropDownOverflow}>{extraResultItems}</div>); //<option className={styles.extraDisabledSkill} value={extraResultItems} key="extraResultsDoNotPost"/>
    }

    matchingItems.push()
    return <div className={styles.searchBox}>
      <input  className={styles.searchBoxText} type="text"  onChange={this._onSearchboxChanged.bind(this)} />
      <div className={styles.searchDropDown} onWheel={this._onWheelSearchBox.bind(this)}>{matchingItems}</div>
    </div>;
  }
}

export const SearchBox: React.ComponentClass<SearchBoxProps> =
    connect(mapStateToProps, mapDispatchToProps)(_SearchBox);