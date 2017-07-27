import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {AttributeAction, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";
import {SystemDataStore} from "../datastore/system-static-store/system-data-store";
import {GroupOrderData} from "../datastore/character-store/attribute-store";
import * as _ from "lodash";

export type PossibleBonusPointActions =  AttributeAction  ;

export const BonusPointsReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: PossibleBonusPointActions): AggregateDataStore => {
    console.log("BonusPointsReducer."+action.type+"("+JSON.stringify(action)+")");
    let singleBonusPointItem : any =  {};
    switch (action.type) {
        case AttributeActionTypesConsts.SET_ATTRIBUTE:
            let attrBrkDwn = state.character.attributesMisc.attributesBreakdown;
            let attrBonusPoints:number = 0;
            _.forEach(attrBrkDwn, (attrGrpOrderData:GroupOrderData)=>{
                var outOf = SystemDataStore.attributesMisc.groupRankValues[attrGrpOrderData.rank]
                var costPerRaise = SystemDataStore.bonusPoints.attributes[attrGrpOrderData.rank];
                if(attrGrpOrderData.sum>outOf) {
                    attrBonusPoints += ((attrGrpOrderData.sum-outOf)*costPerRaise);
                }
            })
            singleBonusPointItem = {attributes: attrBonusPoints};
            return deepAssign({},state, {character:{bonusPoints:singleBonusPointItem}});
        default:
            return state;
    }
}

