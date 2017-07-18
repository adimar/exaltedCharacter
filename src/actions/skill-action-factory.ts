import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";

export const SkillActionTypesConsts = strEnum([
    "SET_SKILL_COST",
    "ADD_SKILL",
    "REMOVE_SKILL",
    "REORDER_SKILLS"
]);


export type SkillAction =  SetSkillCostAction | AddSkillAction | RemoveSkillAction | ReorderSkillsAction;

export interface SetSkillCostAction extends Action {
    type: "SET_SKILL_COST",
    skillId: string,
    skillCost: number
};


export interface AddSkillAction extends Action {
    type: "ADD_SKILL",
    skillId: string
};

export interface RemoveSkillAction extends Action {
    type: "REMOVE_SKILL",
    skillId: string
};

export interface ReorderSkillsAction extends Action {
    type: "REORDER_SKILLS",
    newSkillsOrder:{[skillId:string]:number}
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

export const removeSkill  = (skillId:string): RemoveSkillAction => ({
    type: SkillActionTypesConsts.REMOVE_SKILL,
    skillId: skillId
});


export const reorderSkills  = (newSkillsOrder:{[skillId:string]:number}): ReorderSkillsAction => ({
    type: SkillActionTypesConsts.REORDER_SKILLS,
    newSkillsOrder: newSkillsOrder
});

