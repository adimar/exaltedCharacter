import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {AttributeActions, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";
import {SystemDataStore} from "../datastore/system-static-store/system-data-store";
import {SystemAttribute,AttributeGroupRanks} from "../datastore/system-static-store/system-attributes-store";
import {CharAttribute, GroupOrderData} from "../datastore/character-store/attribute-store";
import * as _ from "lodash";

const  CalculateAttributesBreakdown = function (state: AggregateDataStore) {
    let attributesBreakdown: { [group: string]: GroupOrderData } = _.reduce(state.character.attributes, (agg, charAttr: CharAttribute) => {
        let systemAttr: SystemAttribute = SystemDataStore.attributes[charAttr.id];

        if (agg[systemAttr.group]) {
            agg[systemAttr.group].sum = agg[systemAttr.group].sum + (charAttr.value - 1);
        } else {
            agg[systemAttr.group] = {
                group: systemAttr.group,
                sum: (charAttr.value - 1),
                outOf: -1
            };
        }
        return agg;
    }, {});

    var sortedAttrBrkDwn = _.orderBy(attributesBreakdown, ["sum"], ["desc"]);
    attributesBreakdown[sortedAttrBrkDwn[0].group].rank = AttributeGroupRanks.primary;
    attributesBreakdown[sortedAttrBrkDwn[1].group].rank = AttributeGroupRanks.secondary;
    attributesBreakdown[sortedAttrBrkDwn[2].group].rank = AttributeGroupRanks.tertiary;
    return attributesBreakdown;
};

export const AttributeReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: AttributeActions): AggregateDataStore => {
    console.log("AttributeReducer."+action.type+"("+JSON.stringify(action)+")");
    let singleAttribute : any =  {};
    switch (action.type) {
        case AttributeActionTypesConsts.SET_ATTRIBUTE:
            let currentValue = state.character.attributes[action.attributeId].value;
            let newValue = (action.value===currentValue && currentValue>1?currentValue-1:action.value);
            singleAttribute[action.attributeId] = {value:newValue};
            var newState = deepAssign({},state, {character:{attributes:singleAttribute}});
            newState.character.attributesMisc.attributesBreakdown = CalculateAttributesBreakdown(newState);
            return newState;
        default:
            return state;
    }
}

