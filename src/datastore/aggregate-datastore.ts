



import {CharacterDataStore, CharacterDataStoreInitialState} from "./character-store/character-store";
import {MiscStore, MiscStoreInitialState} from "./character-store/misc-store";
export type AggregateDataStore = {
    character: CharacterDataStore,
    misc: MiscStore

}

export const AggregateDataStoreInitialState : AggregateDataStore = {
    character: CharacterDataStoreInitialState,
    misc: MiscStoreInitialState
}