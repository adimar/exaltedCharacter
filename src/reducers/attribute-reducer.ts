


import {GurpsDataStore, GurpsDataStoreInitialState} from "../datastore/gurps-char-gen-datastore";
import {AttributeAction, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";


export const AttributeReducer = (state: GurpsDataStore = GurpsDataStoreInitialState, action: AttributeAction): GurpsDataStore => {
    console.log("AttributeReducer."+action.type+"("+JSON.stringify(action)+")");
    let singleAttribute : any =  {};
    switch (action.type) {
        case AttributeActionTypesConsts.SET_PRIMARY_ATTRIBUTE:
            singleAttribute[action.attributeId] = {value:action.value};
            return deepAssign({},state, {character:{attributes:singleAttribute}});
        case AttributeActionTypesConsts.SET_DERIVED_ATTRIBUTE:
            let attributeSystemData = state.system.attributes[action.attributeId];
            let costInput = action.cost;
            let trueCost = (costInput>0?
                    Math.ceil(costInput/attributeSystemData.costPerRaise):
                    Math.floor(costInput/attributeSystemData.costPerRaise))
                *attributeSystemData.costPerRaise;
            singleAttribute[action.attributeId] = {cost:trueCost};
            return deepAssign({},state,{character:{attributes:singleAttribute}});
        default:
            return state;
    }
}

