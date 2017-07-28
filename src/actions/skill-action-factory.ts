import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";

export const SkillActionTypeConsts = strEnum([
    "SET_SKILL"

]);

//export type AttributeActionTypes = keyof typeof AttributeActionTypesConsts;


export type SkillActions =  SetSkillAction  ;


export interface SetSkillAction extends Action   {
    type: "SET_SKILL",
    skillId: string,
    value: number,
};


export const setSkill  = (skillId:string, value: number): SetSkillAction => ({
    type: SkillActionTypeConsts.SET_SKILL,
    skillId: skillId,
    value: value,
});
