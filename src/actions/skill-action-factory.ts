import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";

export const SkillActionTypesConsts = strEnum([
    "SET_SKILL_COST",
    "ADD_SKILL",
    "REORDER_SKILL"
]);


export type SkillAction =  SetSkillCostAction | AddSkillAction | ReorderSkillAction;

export interface SetSkillCostAction extends Action {
    type: "SET_SKILL_COST",
    skillId: string,
    skillCost: number
};


export interface AddSkillAction extends Action {
    type: "ADD_SKILL",
    skillId: string
};

export interface ReorderSkillAction extends Action {
    type: "REORDER_SKILL",
    skillId: string,
    newSkillOrder: number
}


export const setSkillCost  = (skillId:string, skillCost: number): SetSkillCostAction => ({
    type: SkillActionTypesConsts.SET_SKILL_COST,
    skillId: skillId,
    skillCost: skillCost

});

export const addSkill  = (skillId:string): AddSkillAction => ({
    type: SkillActionTypesConsts.ADD_SKILL,
    skillId: skillId
});


export const reorderSkill  = (skillId:string, newSkillOrder:number): ReorderSkillAction => ({
    type: SkillActionTypesConsts.REORDER_SKILL,
    skillId: skillId,
    newSkillOrder:newSkillOrder
});

