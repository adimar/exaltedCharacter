


import {SystemDataStore, SystemDataStoreInitialState} from "./system-store";
import {CharacterDataStore, CharacterDataStoreInitialState} from "./character-store";
export type GurpsDataStore = {

    system: SystemDataStore,
    character: CharacterDataStore
}

export const GurpsDataStoreInitialState : GurpsDataStore = {
    system: SystemDataStoreInitialState,
    character: CharacterDataStoreInitialState
}