


import {Action, combineReducers, Store} from "redux";
import {AttributeReducer} from "./attribute-reducer";
import {GurpsDataStore, GurpsDataStoreInitialState} from "../datastore/gurps-char-gen-datastore";
import * as _ from "lodash";



export  const AggregateReducer = <A extends Action>(state: GurpsDataStore = GurpsDataStoreInitialState, action: A): GurpsDataStore => {
    console.log("AggregateReducers."+action.type+"("+JSON.stringify(action)+")");
    _.forEach(ReducerRegistry.reducers,reducer=>{
        state = reducer(state,<any>action);
    });

    return state;
}


class _ReducerRegistry {
    private  _reducersArray:{ <A extends Action>(state:Store<GurpsDataStore>,action:A):GurpsDataStore}[] = [];
    public register(reducer) {
        this._reducersArray.push(reducer);
    }

    public get reducers():any {
        return this._reducersArray;
    }

}

export const ReducerRegistry = new _ReducerRegistry();
ReducerRegistry.register(AttributeReducer);

// export function RegisterReducer() {
//     return function(target,properyKey:string,decriptor: PropertyDescriptor) {
//         ReducerRegistry.register(target);
//     }
// }
