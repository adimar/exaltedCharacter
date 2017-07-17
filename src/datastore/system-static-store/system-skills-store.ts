
import {strEnum} from "../../helpers/str-enum";
import {AttributeIdConstTypes} from "./system-attributes-store";
export const SkillDifficultyConsts = strEnum(["E", "A", "H", "VH"]);
export type SkillDifficultyConstsTypes = keyof typeof SkillDifficultyConsts;
var  gurpsSkills  = require("./raw-data/raw-gurps-skills.json");


export type SysSkillDefault = {
    type: string;
    name: string;
    modifier: number;
}
export type SysSkill = {
    skillId: string;
    name: string;
    attributeId: string;
    difficulty: string;
    reference: string;
    categories: string[];
    defaults: SysSkillDefault[]
    specializations: string[]
    optionalSpecializations: string[]
} 

type SkillListStore = { [skillId: string]: SysSkill };

const SystemSkillsListStoreInitialState: SkillListStore = gurpsSkills;

const SkillRelativeStart = {
    "E": 0,
    "A": -1,
    "H": -2,
    "VH": -3
}

const SkillDifficultyCostProgression = [1,2,4,8,12,16,20,24,28];


type SkillsStore = {
    list: SkillListStore;
    relativeStart: {[difficulty:string]:number};
    difficultyCostProgression: number[];
}


export const SystemSkillsStoreInitialState: SkillsStore = {
    list: SystemSkillsListStoreInitialState,
    relativeStart: SkillRelativeStart,
    difficultyCostProgression: SkillDifficultyCostProgression
}