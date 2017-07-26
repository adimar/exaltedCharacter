import {SystemDataStore} from "../system-static-store/system-data-store";
export type CharAttribute = {
    id:string;
    value: number;
}

export type AttributesStore = {[attributeId:string]: CharAttribute};

export const CharacterAttributeStoreInitialState : AttributesStore = {
    "strength":{"id":"strength","value":1},
    "dexterity":{"id":"dexterity","value":1},
    "stamina":{"id":"stamina","value":1},
    "charisma":{"id":"charisma","value":1},
    "manipulation":{"id":"manipulation","value":1},
    "appearance":{"id":"appearance","value":1},
    "perception":{"id":"perception","value":1},
    "intelligence":{"id":"intelligence","value":1},
    "wits":{"id":"wits","value":1},
}