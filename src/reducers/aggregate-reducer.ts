


import {Action, Store} from "redux";
import {AttributeReducer} from "./attribute-reducer";
import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import * as _ from "lodash";

export  const AggregateReducer = <A extends Action>(state: AggregateDataStore = AggregateDataStoreInitialState, action: A): AggregateDataStore => {
    console.log("AggregateReducers."+action.type+"("+JSON.stringify(action)+")");
    _.forEach(ReducerRegistry.reducers,reducer=>{
        state = reducer(state,<any>action);
    });

    return state;
}


class _ReducerRegistry {
    private  _reducersArray:{ <A extends Action>(state:Store<AggregateDataStore>,action:A):AggregateDataStore}[] = [];
    public register(reducer) {
        this._reducersArray.push(reducer);
    }

    public get reducers():any {
        return this._reducersArray;
    }

}

export const ReducerRegistry = new _ReducerRegistry();
ReducerRegistry.register(AttributeReducer);


