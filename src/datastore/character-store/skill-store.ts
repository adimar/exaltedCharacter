import {SystemDataStore} from "../system-static-store/system-data-store";

export type CharSkill = {
    relativeLevel: number
}


export type SkillsStore = {[skillId:string]: CharSkill};

export const CharacterSkillsStoreInitialState = {
    knife:{relativeLevel:0},
    stealth: {relativeLevel:-1},
    karate:{relativeLevel:-2},
    observation:{relativeLevel:-1},
    intimidation:{relativeLevel:-1},
    carousing:{relativeLevel:0},

}