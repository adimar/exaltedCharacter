
import {AttributesStore, CharacterAttributeStoreInitialState} from "./attribute-store";
import {CharacterSkillsStoreInitialState, SkillsStore} from "./skill-store";

export type CharacterDataStore = {
    attributes: AttributesStore,
    skills: SkillsStore,

}





export const CharacterDataStoreInitialState : CharacterDataStore = {
    attributes: CharacterAttributeStoreInitialState,
    skills: CharacterSkillsStoreInitialState,

}