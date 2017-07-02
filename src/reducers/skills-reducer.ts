

import * as deepAssign from "deep-assign";
import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {SkillAction, SkillActionTypesConsts} from "../actions/skill-action-factory";
export const SkillsReducer  = (state: AggregateDataStore = AggregateDataStoreInitialState, action: SkillAction): AggregateDataStore => {
    console.log("AttributeReducer." + action.type + "(" + JSON.stringify(action) + ")");

    let singleSkill : any =  {};
    switch (action.type) {
        case SkillActionTypesConsts.SET_RELATIVE_SKILL_LEVEL:
            singleSkill[action.skillId] = {relativeLevel: action.relativeLevel};
            return deepAssign({},state,{character:{skills:singleSkill}});
        default:
            return state;
    }
}