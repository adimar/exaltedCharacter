
import {AttributesStore, CharacterAttributeStoreInitialState} from "./attribute-store";
import {CharacterSkillsStoreInitialState, SkillsStore} from "./skill-store";
import {MiscStore, MiscStoreInitialState} from "./misc-store";

export type CharacterDataStore = {
    attributes: AttributesStore,
    skills: SkillsStore,
    misc: MiscStore
}





export const CharacterDataStoreInitialState : CharacterDataStore = {
    attributes: CharacterAttributeStoreInitialState,
    skills: CharacterSkillsStoreInitialState,
    misc: MiscStoreInitialState

}