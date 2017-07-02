import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";

export const SkillActionTypesConsts = strEnum([
    "SET_RELATIVE_SKILL_LEVEL",
    "ADD_SKILL"
]);


export type SkillAction =  SetRelativeSkillLevelAction | AddSkillAction ;

export interface SetRelativeSkillLevelAction extends Action {
    type: "SET_RELATIVE_SKILL_LEVEL",
    skillId: string,
    relativeLevel: number
};


export interface AddSkillAction extends Action {
    type: "ADD_SKILL",
    skillId: string
};


export const setRelativeSkillLevel  = (skillId:string, relativeLevel: number): SetRelativeSkillLevelAction => ({
    type: SkillActionTypesConsts.SET_RELATIVE_SKILL_LEVEL,
    skillId: skillId,
    relativeLevel: relativeLevel

});

export const addSkillLevel  = (skillId:string): AddSkillAction => ({
    type: SkillActionTypesConsts.ADD_SKILL,
    skillId: skillId
});