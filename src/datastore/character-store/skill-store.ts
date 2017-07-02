import {SystemDataStore} from "../system-static-store/system-data-store";

export type Skill = {
    relativeLevel: number
}


export type SkillsStore = {[skillId:string]: Skill};

export const CharacterSkillsStoreInitialState = {
    knife:{relativeLevel:0},
    stealth: {relativeLevel:0},
    karate:{relativeLevel:0}

}