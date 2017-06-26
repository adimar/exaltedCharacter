


import {GurpsDataStore, GurpsDataStoreInitialState} from "../datastore/gurps-char-gen-datastore";
import {AttributeAction, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";


export const AttributeReducer = (state: GurpsDataStore.All = GurpsDataStoreInitialState, action: AttributeAction): GurpsDataStore.All => {
    console.log("AttributeReducer."+action.type+"("+JSON.stringify(action)+")");
    switch (action.type) {
        case AttributeActionTypesConsts.SET_PRIMARY_ATTRIBUTE:
            let singleAttribute : any =  {};
            singleAttribute[action.attributeId] = {value:action.value};
            let charAssign = {character:{attributes:singleAttribute}};
            return deepAssign({},state,charAssign);
        default:
            return state;
    }
}

