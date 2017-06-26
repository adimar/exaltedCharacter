import { Action } from "../actions/action-factory";
import {AllDatastoreInitialState, CounterDatastoreInitialState, DataStore,} from "../datastore/character-store";


export const CounterReducer = (state: DataStore.All = AllDatastoreInitialState, action: Action): DataStore.All => {
    switch (action.type) {
        case "INCREMENT_COUNTER":
            const { value } = state.counter;
            const newValue = value + action.delta;
            return (<any>Object).assign({},state,{counter: { value: newValue }});
        case "RESET_COUNTER":
            return (<any>Object).assign({},state,{counter: CounterDatastoreInitialState});
        default:
            return state;
    }
}


