import {AggregateDataStore} from "../aggregate-datastore";
import {SystemDataStore} from "../system-static-store/system-data-store";
import {SysSkill, SysSkillDefault} from "../system-static-store/system-skills-store";
import {CharSkill} from "../character-store/skill-store";
import * as _ from "lodash";
import {SystemDataAggregators} from "./system-data-aggregators";
export interface AggregatedSkill {
    relativeStart: number;
    relativeLevel: number;
    skillLevel: number;
}

export const SkillsAggregator = (state: AggregateDataStore, skillId: string): AggregatedSkill => {
    var sysSkill: SysSkill = SystemDataStore.skills.list[skillId];
    var charSkill: CharSkill = state.character.skills[skillId];



    let relativeStart, relativeLevel,skillLevel;
    var attribute = SystemDataAggregators.attributes(state, sysSkill.attributeId).value;

    if (charSkill.skillCost > 0) {
        relativeStart = SystemDataStore.skills.relativeStart[sysSkill.difficulty];
        let levelsRaised = _.findIndex(SystemDataStore.skills.difficultyCostProgression, (levelRaiseCost) => charSkill.skillCost === levelRaiseCost)-1;
        relativeLevel = relativeStart+levelsRaised;
        skillLevel = attribute+relativeStart+levelsRaised;

    } else if(sysSkill.attributeDefault){
       // var defaultAttributeValue:number = SystemDataAggregators.attributes(state,sysSkill.attributeDefault.name).value;
        relativeStart = sysSkill.attributeDefault.modifier;
        relativeLevel = relativeStart;
        skillLevel = attribute+relativeStart;

    } else {
        relativeStart = -999;
        relativeLevel = -999;
        skillLevel = 0;
    }


    return {
        relativeStart:  relativeStart,
        relativeLevel: relativeLevel,
        skillLevel: skillLevel
    }
}