import {SystemDataStore} from "../system-static-store/system-data-store";
export type Attribute = {
    cost: number;
}

export type AttributesStore = {[attributeId:string]: Attribute};

export const CharacterAttributeStoreInitialState : AttributesStore = {
    st: {cost:0},
    dx: {cost:0},
    iq: {cost:0},
    ht: {cost:0},
    hp: {cost:0},
    will: {cost:0},
    per: {cost:0},
    fp: {cost:0},
    strike: {cost:0},
    speed: {cost:0},
    move: {cost:0},
}