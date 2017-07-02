import {SystemDataStore} from "../system-static-store/system-data-store";
export type Attribute = {
    value?: number;
    cost?: number;
}

export type AttributesStore = {[attributeId:string]: Attribute};

export const CharacterAttributeStoreInitialState : AttributesStore = {
    st: {value:SystemDataStore.attributes.st.base},
    dx: {value:SystemDataStore.attributes.dx.base},
    iq: {value:SystemDataStore.attributes.iq.base},
    ht: {value:SystemDataStore.attributes.ht.base},
    hp: {cost:0},
    will: {cost:0},
    per: {cost:0},
    fp: {cost:0},
    strike: {cost:0},
    speed: {cost:0},
    move: {cost:0},
}