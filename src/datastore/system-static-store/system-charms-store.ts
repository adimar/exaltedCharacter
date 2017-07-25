
var  ExaltedCharms = require("./raw-data/exalted-charms.json");
import * as _ from "lodash";


export type SystemCharm = {
    id: string;
    name: string;
    cost: string;
    ability: string;
    abilityMin: number;
    essenceMin: number;
    type: string;
    keywords: string[];
    duration: string;
    prerequisites: string[];
}


type CharmStore = { [charmId: string]: SystemCharm };

export const SystemSkillsStoreInitialState: CharmStore = ExaltedCharms;