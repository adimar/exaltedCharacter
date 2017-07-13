import * as _ from "lodash";

import * as deepAssign from "deep-assign";
import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {SkillAction, SkillActionTypesConsts} from "../actions/skill-action-factory";
export const SkillsReducer  = (state: AggregateDataStore = AggregateDataStoreInitialState, action: SkillAction): AggregateDataStore => {
    console.log("AttributeReducer." + action.type + "(" + JSON.stringify(action) + ")");

    let singleSkill : any =  {};
    switch (action.type) {
        case SkillActionTypesConsts.SET_SKILL_COST:
            singleSkill[action.skillId] = {skillCost: action.skillCost};
            return deepAssign({},state,{character:{skills:singleSkill}});
        case SkillActionTypesConsts.ADD_SKILL:

            singleSkill[action.skillId] = {skillId:action.skillId,skillCost: 1, order:_.size(state.character.skills)};
            return deepAssign({},state,{character:{skills:singleSkill}});
        default:
            return state;
    }
}