import {SystemDataStore} from "../system-static-store/system-data-store";

export type CharSkill = {
    skillCost: number
}


export type SkillsStore = {[skillId:string]: CharSkill};

export const CharacterSkillsStoreInitialState = {
    knife:{skillCost:1},
    stealth: {skillCost:1},
    karate:{skillCost:1},
    observation:{skillCost:1},
    intimidation:{skillCost:1},
    carousing:{skillCost:1},

}