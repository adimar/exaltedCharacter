



import {CharacterDataStore, CharacterDataStoreInitialState} from "./character-store/character-store";

export type AggregateDataStore = {
    character: CharacterDataStore,
}

export const AggregateDataStoreInitialState : AggregateDataStore = {
    character: CharacterDataStoreInitialState,
}