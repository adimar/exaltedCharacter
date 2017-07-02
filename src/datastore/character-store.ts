




import {SystemDataStore} from "./system-static-store/system-data-store";
export type cAttribute = {
    value?: number;
    cost?: number;
}

export type cAttributesStore = {[attributeId:string]: cAttribute};
export type CharacterDataStore = {




    attributes: cAttributesStore

}


export const CharacterAttributeStoreInitialState : cAttributesStore = {
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


export const CharacterDataStoreInitialState : CharacterDataStore = {
    attributes: CharacterAttributeStoreInitialState
}