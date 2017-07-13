import {SystemDataStore} from "../system-static-store/system-data-store";

export type CharSkill = {
    skillCost: number,
    skillId:string;
    order:number;
}


export type SkillsStore = {[skillId:string]: CharSkill};

export const CharacterSkillsStoreInitialState = {
    knife:{skillId:"knife",skillCost:1,order:0},
    stealth: {skillId:"stealth",skillCost:1,order:1},
    karate:{skillId:"karate",skillCost:1,order:5},
    observation:{skillId:"observation",skillCost:1,order:3},
    intimidation:{skillId:"intimidation",skillCost:1,order:4},
    carousing:{skillId:"carousing",skillCost:1,order:2},

}