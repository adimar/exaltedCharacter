import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {SearchAction, SearchboxActionTypesConsts} from "../actions/search-box-action-factory";
import {SystemDataStore} from "../datastore/system-static-store/system-data-store";
import * as deepAssign from "deep-assign";
import * as _ from "lodash";
import {CharacterDataStore} from "../datastore/character-store/character-store";
export const SearchReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: SearchAction): AggregateDataStore => {
    console.log("SearchReducer." + action.type + "(" + JSON.stringify(action) + ")");

    let singleSearchbox : any =  {};
    switch (action.type) {
        case SearchboxActionTypesConsts.REGISTER_SEARCHBOX:

            var dataStoreNode = _.get(SystemDataStore,action.dataPath);
            var possibleObjectList = _.reduce(_.values(dataStoreNode),(accumulator, dataNode)=>{
                accumulator[dataNode[action.idField]]=dataNode;
                return accumulator;
             },{});

            singleSearchbox[action.searchBoxId] = {
                possibleObjectList: possibleObjectList,
                matches: {},
                valueField: action.valueField,
                idField:action.idField,
                excludePath: action.excludePath,
                searchBoxPattern:""
            };

            return deepAssign({},state, {misc:{searchElement:singleSearchbox}});

        case SearchboxActionTypesConsts.GET_MATHING:
            var patternMatches;
            var patternRegex = new RegExp(action.pattern,"i");
            if(_.size(action.pattern)>0) {
                var searchBox = state.misc.searchElement[action.searchBoxId];
                var excludedIds = _.keys(_.get(state,searchBox.excludePath));
                patternMatches = _.filter(searchBox.possibleObjectList,
                    (object)=>{

                        return  _.indexOf(excludedIds,object[searchBox.idField])===-1 &&
                                patternRegex.exec(object[searchBox.valueField]);
                    });
            } else {
                patternMatches = {};
            }

            var newBaseState = deepAssign({},state);
            newBaseState.misc.searchElement[action.searchBoxId].matches = patternMatches;
            newBaseState.misc.searchElement[action.searchBoxId].searchBoxPattern = action.pattern;
            return newBaseState;

        case SearchboxActionTypesConsts.CLEAR_SEARCHBOX:
            var newBaseState = deepAssign({},state);
            newBaseState.misc.searchElement[action.searchBoxId].matches = [];
            newBaseState.misc.searchElement[action.searchBoxId].searchBoxPattern = "";
            return newBaseState;

        default:
            return state;
    }
}

