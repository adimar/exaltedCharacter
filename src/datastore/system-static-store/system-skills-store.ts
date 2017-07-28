import {strEnum} from "../../helpers/str-enum";
var  ExaltedSkills = require("./raw-data/exalted-skills.json");
import * as _ from "lodash";

export const SkillIdConsts = strEnum(["archery","athletics","awareness","brawl","bureaucracy","craft","dodge",
    "integrity","investigation","larceny","linguistics","lore","martial arts","medicine","melee", "occult",
    "performance","presence","resistance","ride","sail","socialize","stealth","survival","thrown","war"]);
export type SkillIdConstTypes = keyof typeof SkillIdConsts;

type SkillsStore = { [sillId: string]: SystemSkill };


type SystemSkill = {
    id: string;
    name: string;
    base:number;
}

export const SystemSkillsMiscInitialState = {
    maxNonBonusRating: 3,
    baseSkills: 28
}

export const SystemSkillsStoreInitialState: SkillsStore = ExaltedSkills;

