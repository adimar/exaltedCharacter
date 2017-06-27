


import {GurpsDataStore, GurpsDataStoreInitialState} from "../datastore/gurps-char-gen-datastore";
import {AttributeAction, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";


export const AttributeReducer = (state: GurpsDataStore.All = GurpsDataStoreInitialState, action: AttributeAction): GurpsDataStore.All => {
    console.log("AttributeReducer."+action.type+"("+JSON.stringify(action)+")");
    let singleAttribute : any =  {};
    switch (action.type) {
        case AttributeActionTypesConsts.SET_PRIMARY_ATTRIBUTE:
            singleAttribute[action.attributeId] = {value:action.value};
            return deepAssign({},state, {character:{attributes:singleAttribute}});
        case AttributeActionTypesConsts.SET_DERIVED_ATTRIBUTE:
            singleAttribute[action.attributeId] = {cost:action.cost};
            return deepAssign({},state,{character:{attributes:singleAttribute}});
        default:
            return state;
    }
}

