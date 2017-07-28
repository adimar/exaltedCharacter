

import {strEnum} from "../../helpers/str-enum";
export const SkillAptitude = strEnum(["supernal","favored","regular"]);
export type SkillAptitudeTypes = keyof typeof SkillAptitude;

export type CharSkill = {
    id:string;
    value: number;
    favored: string;
}


export type SkillsStore = {[skillId:string]: CharSkill};

export const CharacterSkillsStoreInitialState = {
    "archery":{"id":"archery","value":0, "favored":SkillAptitude.regular},
    "athletics":{"id":"athletics","value":0, "favored":SkillAptitude.regular},
    "awareness":{"id":"awareness","value":0, "favored":SkillAptitude.regular},
    "brawl":{"id":"brawl","value":0, "favored":SkillAptitude.regular},
    "bureaucracy":{"id":"bureaucracy","value":0, "favored":SkillAptitude.regular},
    "craft":{"id":"craft","value":0, "favored":SkillAptitude.regular},
    "dodge":{"id":"dodge","value":0, "favored":SkillAptitude.regular},
    "integrity":{"id":"integrity","value":0, "favored":SkillAptitude.regular},
    "investigation":{"id":"investigation","value":0, "favored":SkillAptitude.regular},
    "larceny":{"id":"larceny","value":0, "favored":SkillAptitude.regular},
    "linguistics":{"id":"linguistics","value":0, "favored":SkillAptitude.regular},
    "lore":{"id":"lore","value":0, "favored":SkillAptitude.regular},
    "martial arts":{"id":"martial arts","value":0, "favored":SkillAptitude.regular},
    "medicine":{"id":"medicine","value":0, "favored":SkillAptitude.regular},
    "melee":{"id":"melee","value":0, "favored":SkillAptitude.regular},
    "occult":{"id":"occult","value":0, "favored":SkillAptitude.regular},
    "performance":{"id":"performance","value":0, "favored":SkillAptitude.regular},
    "presence":{"id":"presence","value":0, "favored":SkillAptitude.regular},
    "resistance":{"id":"resistance","value":0, "favored":SkillAptitude.regular},
    "ride":{"id":"ride","value":0, "favored":SkillAptitude.regular},
    "sail":{"id":"sail","value":0, "favored":SkillAptitude.regular},
    "socialize":{"id":"socialize","value":0, "favored":SkillAptitude.regular},
    "stealth":{"id":"stealth","value":0, "favored":SkillAptitude.regular},
    "survival":{"id":"survival","value":0, "favored":SkillAptitude.regular},
    "thrown":{"id":"thrown","value":0, "favored":SkillAptitude.regular},
    "war":{"id":"war","value":0, "favored":SkillAptitude.regular}
}