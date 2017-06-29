


import {Action, combineReducers} from "redux";
import {AttributeReducer} from "./attribute-reducer";
import {GurpsDataStore, GurpsDataStoreInitialState} from "../datastore/gurps-char-gen-datastore";
import * as _ from "lodash";

const reducersArray = [AttributeReducer];

export  const AggregateReducer = <A extends Action>(state: GurpsDataStore = GurpsDataStoreInitialState, action: A): GurpsDataStore => {
    console.log("AggregateReducers."+action.type+"("+JSON.stringify(action)+")");
    _.forEach(reducersArray,reducer=>{
        state = reducer(state,<any>action);
    });

    return state;
}
