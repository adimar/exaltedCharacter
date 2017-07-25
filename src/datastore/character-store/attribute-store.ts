import {SystemDataStore} from "../system-static-store/system-data-store";
export type Attribute = {
    id:string;
    cost: number;
}

export type AttributesStore = {[attributeId:string]: Attribute};

export const CharacterAttributeStoreInitialState : AttributesStore = {
    "strength":{"id":"strength","cost":0},
    "dexterity":{"id":"dexterity","cost":0},
    "stamina":{"id":"stamina","cost":0},
    "charisma":{"id":"charisma","cost":0},
    "manipulation":{"id":"manipulation","cost":0},
    "appearance":{"id":"appearance","cost":0},
    "perception":{"id":"perception","cost":0},
    "intelligence":{"id":"intelligence","cost":0},
    "wits":{"id":"wits","cost":0},
}