import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {AttributeAction, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";
import {SystemDataStore} from "../datastore/system-static-store/system-data-store";

export const AttributeReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: AttributeAction): AggregateDataStore => {
    console.log("AttributeReducer."+action.type+"("+JSON.stringify(action)+")");
    let singleAttribute : any =  {};
    switch (action.type) {

        default:
            return state;
    }
}

