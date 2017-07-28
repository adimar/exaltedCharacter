import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import * as deepAssign from "deep-assign";
import * as _ from "lodash";
import {SkillActions, SkillActionTypeConsts} from "../actions/skill-action-factory";

export const SkillsReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: SkillActions): AggregateDataStore => {
    console.log("AttributeReducer."+action.type+"("+JSON.stringify(action)+")");
    let singleSkill : any =  {};
    switch (action.type) {
        case SkillActionTypeConsts.SET_SKILL:
            let currentValue = state.character.skills[action.skillId].value;
            let newValue = (action.value===currentValue?currentValue-1:action.value);
            singleSkill[action.skillId] = {value:newValue};
            return deepAssign({},state, {character:{skills:singleSkill}});
        default:
            return state;
    }
}