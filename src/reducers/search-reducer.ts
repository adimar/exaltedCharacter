import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {SearchAction, SearchboxActionTypesConsts} from "../actions/search-box-action-factory";
import {SystemDataStore} from "../datastore/system-static-store/system-data-store";
import * as deepAssign from "deep-assign";
import * as _ from "lodash";
export const SearchReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: SearchAction): AggregateDataStore => {
    console.log("SearchReducer." + action.type + "(" + JSON.stringify(action) + ")");

    let singleSearchbox : any =  {};
    switch (action.type) {
        case SearchboxActionTypesConsts.REGISTER_SEARCHBOX:

            var dataStoreNode = _.get(SystemDataStore,action.dataPath);
            var possibleObjectList = [];
            _.forEach(dataStoreNode,(dataNode)=>{
                possibleObjectList.push({id:dataNode[action.idField],value:dataNode[action.valueField]});
             });

            singleSearchbox[action.searchBoxId] = {
                possibleObjectList: possibleObjectList,
                matches: []
            };

            return deepAssign({},state, {misc:{searchElement:singleSearchbox}});
        case SearchboxActionTypesConsts.GET_MATHING:
            var patternMatches = _.filter(state.misc.searchElement[action.searchBoxId].possibleObjectList,
                    object=>new RegExp(action.pattern,"i").exec(object.value));


            var newState = deepAssign({},state);
            newState.misc.searchElement[action.searchBoxId].matches = patternMatches;
            return newState;

        default:
            return state;
    }
}

