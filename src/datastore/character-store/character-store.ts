
import {AttributesStore, CharacterAttributeStoreInitialState} from "./attribute-store";
import {CharacterSkillsStoreInitialState, SkillsStore} from "./skill-store";
import {CharacterRaceInitialState, RaceStore} from "./race-store";
export type CharacterDataStore = {
    attributes: AttributesStore,
    skills: SkillsStore,
    race: RaceStore
}





export const CharacterDataStoreInitialState : CharacterDataStore = {
    attributes: CharacterAttributeStoreInitialState,
    skills: CharacterSkillsStoreInitialState,
    race: CharacterRaceInitialState
}