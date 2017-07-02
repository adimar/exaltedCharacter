



import {CharacterDataStore, CharacterDataStoreInitialState} from "./character-store";
export type AggregateDataStore = {
    character: CharacterDataStore
}

export const AggregateDataStoreInitialState : AggregateDataStore = {
    character: CharacterDataStoreInitialState
}