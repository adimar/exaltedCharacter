
import {AggregateDataStore} from "../aggregate-datastore";
import {SystemDataStore} from "../system-static-store/system-data-store";
import {SysSkill} from "../system-static-store/system-skills-store";
import {CharSkill} from "../character-store/skill-store";
import * as _ from "lodash";
import {SystemDataAggregators} from "./system-data-aggregators";
export interface AggregatedSkill {
    relativeStart: number;
    relativeLevel: number;
    skillLevel: number;
}

export const SkillsAggregator = (state:AggregateDataStore,skillId: string):AggregatedSkill => {
    var sysSkill: SysSkill = SystemDataStore.skills.list[skillId];
    var charSkill: CharSkill = state.character.skills[skillId];
    var relativeStart = SystemDataStore.skills.relativeStart[sysSkill.difficulty];
    var levelsRaised = _.findIndex(SystemDataStore.skills.difficultyCostProgression,(levelRaiseCost)=>charSkill.skillCost===levelRaiseCost);
    var attribute =  SystemDataAggregators.attributes(state,sysSkill.attributeId).value;
    return {
        relativeStart:  relativeStart,
        relativeLevel: relativeStart+levelsRaised,
        skillLevel: attribute+relativeStart+levelsRaised
    }
}