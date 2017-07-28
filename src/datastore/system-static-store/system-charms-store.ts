
var  ExaltedCharms = require("./raw-data/exalted-charms.json");
import * as _ from "lodash";


export type SystemCharm = {
    id: string;
    name: string;
    cost: string;
    skill: string;
    skillMin: number;
    essenceMin: number;
    type: string;
    keywords: string[];
    duration: string;
    prerequisites: string[];
}


type CharmStore = { [charmId: string]: SystemCharm };

export const SystemCharmsStoreInitialState: CharmStore = ExaltedCharms;