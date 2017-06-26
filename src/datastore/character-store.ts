



import cAttributesStore = CharacterDataStore.cAttributesStore;
export namespace CharacterDataStore {

    export type cAttribute = {
        value: number;
    }

    export type cAttributesStore = {[attributeId:string]: cAttribute};



    export type All = {
        attributes: cAttributesStore
    }
}


export const CharacterAttributeStoreInitialState : cAttributesStore = {
    st: {value:0},
    dx: {value:0},
    iq: {value:0},
    ht: {value:0},
    hp: {value:0},
    will: {value:0},
    per: {value:0},
    fp: {value:0},
}


export const CharacterDataStoreInitialState : CharacterDataStore.All = {
    attributes: CharacterAttributeStoreInitialState
}