
import {
    AttributesStore, CharacterAttributeStoreInitialState, CharAttributeMisc,
    CharAttributeMiscInitialState
} from "./attribute-store";
import {CharacterSkillsStoreInitialState, SkillsStore} from "./skill-store";
import {MiscStore, MiscStoreInitialState} from "./misc-store";
import {BonusPointsStore, BonusPointsStoreInitialState} from "./bonus-points-store";

export type CharacterDataStore = {
    attributes: AttributesStore,
    attributesMisc: CharAttributeMisc,
    skills: SkillsStore,
    bonusPoints: BonusPointsStore
    misc: MiscStore
}



export const CharacterDataStoreInitialState : CharacterDataStore = {
    attributes: CharacterAttributeStoreInitialState,
    attributesMisc: CharAttributeMiscInitialState,
    skills: CharacterSkillsStoreInitialState,
    bonusPoints: BonusPointsStoreInitialState,
    misc: MiscStoreInitialState

}