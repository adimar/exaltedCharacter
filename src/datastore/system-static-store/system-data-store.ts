
import {SystemAttributesMiscInitialState, SystemAttributeStoreInitialState} from "./system-attributes-store";
import {SystemSkillsMiscInitialState, SystemSkillsStoreInitialState} from "./system-skills-store";
import {SystemBonusPointsStoreInitialState} from "./system-bonus-points-store";
import {SystemCharmsStoreInitialState} from "./system-charms-store";


export const SystemDataStore = {
    attributes: SystemAttributeStoreInitialState,
    attributesMisc: SystemAttributesMiscInitialState,
    skills: SystemSkillsStoreInitialState,
    skillsMisc: SystemSkillsMiscInitialState,
    bonusPoints:SystemBonusPointsStoreInitialState,
    charms: SystemCharmsStoreInitialState
}


