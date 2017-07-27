
import {AttributeGroupRanks, AttributeGroupRankTypes} from "../system-static-store/system-attributes-store";



export type GroupOrderData = {
    group:string;
    sum:number;
    rank: AttributeGroupRankTypes
}

export type CharAttributeMisc = {
    attributesBreakdown: {[groupName:string]:GroupOrderData};
}

export const CharAttributeMiscInitialState: CharAttributeMisc = {
    attributesBreakdown: {
        physical:{group:"physical",sum:0, rank: AttributeGroupRanks.primary},
        social:{group:"social",sum:0, rank: AttributeGroupRanks.secondary},
        mental:{group:"mental",sum:0, rank: AttributeGroupRanks.tertiary}
    }
}

//----------------------------------------------------
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