


import {SystemDataStore, SystemDataStoreInitialState} from "./system-store";
import {CharacterDataStore, CharacterDataStoreInitialState} from "./character-store";
export namespace GurpsDataStore {




    export type All = {
        system: SystemDataStore.All,
        character: CharacterDataStore.All
    }
}

export const GurpsDataStoreInitialState : GurpsDataStore.All = {
    system: SystemDataStoreInitialState,
    character: CharacterDataStoreInitialState
}