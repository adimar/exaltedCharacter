import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {AttributeAction, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";
import {SystemDataStore} from "../datastore/system-static-store/system-data-store";

export const AttributeReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: AttributeAction): AggregateDataStore => {
    console.log("AttributeReducer."+action.type+"("+JSON.stringify(action)+")");
    let singleAttribute : any =  {};
    switch (action.type) {
        case AttributeActionTypesConsts.SET_ATTRIBUTE:
            let currentValue = state.character.attributes[action.attributeId].value;
            let newValue = (action.value===currentValue && currentValue>1?currentValue-1:action.value);
            singleAttribute[action.attributeId] = {value:newValue};
            return deepAssign({},state, {character:{attributes:singleAttribute}});
        default:
            return state;
    }
}

