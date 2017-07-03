import {SystemDataStore} from "../system-static-store/system-data-store";

export type Skill = {
    relativeLevel: number
}


export type SkillsStore = {[skillId:string]: Skill};

export const CharacterSkillsStoreInitialState = {
    knife:{relativeLevel:0},
    stealth: {relativeLevel:-1},
    karate:{relativeLevel:-2},
    observation:{relativeLevel:-1},
    intimidation:{relativeLevel:-1},
    carousing:{relativeLevel:0},

}