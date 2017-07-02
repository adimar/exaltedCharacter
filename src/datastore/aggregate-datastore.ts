


import {SystemDataStore, SystemDataStoreInitialState} from "./system-store";
import {CharacterDataStore, CharacterDataStoreInitialState} from "./character-store";
export type AggregateDataStore = {

    system: SystemDataStore,
    character: CharacterDataStore
}

export const AggregateDataStoreInitialState : AggregateDataStore = {
    system: SystemDataStoreInitialState,
    character: CharacterDataStoreInitialState
}