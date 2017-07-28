import {AggregateDataStore, AggregateDataStoreInitialState} from "../datastore/aggregate-datastore";
import {AttributeActions, AttributeActionTypesConsts} from "../actions/attribute-action-factory";
import * as deepAssign from "deep-assign";
import {SystemDataStore} from "../datastore/system-static-store/system-data-store";
import {GroupOrderData} from "../datastore/character-store/attribute-store";
import * as _ from "lodash";
import {SkillActions, SkillActionTypeConsts} from "../actions/skill-action-factory";
import {CharSkill, SkillAptitude} from "../datastore/character-store/skill-store";


export type PossibleBonusPointActions =  AttributeActions | SkillActions  ;
const SKILL_NON_BONUS_MAX_RATING = SystemDataStore.skillsMisc.maxNonBonusRating
const BASE_SKILLS=SystemDataStore.skillsMisc.baseSkills;
const CalculateAttributeBonusPoints = (state: AggregateDataStore):number=>{
    let attrBrkDwn = state.character.attributesMisc.attributesBreakdown;
    let attrBonusPoints:number = 0;
    _.forEach(attrBrkDwn, (attrGrpOrderData:GroupOrderData)=>{
        var outOf = SystemDataStore.attributesMisc.groupRankValues[attrGrpOrderData.rank]
        var costPerRaise = SystemDataStore.bonusPoints.attributes[attrGrpOrderData.rank];
        if(attrGrpOrderData.sum>outOf) {
            attrBonusPoints += ((attrGrpOrderData.sum-outOf)*costPerRaise);
        }
    })
    return attrBonusPoints;
}

const CalculateSkillBonusPoints = (state: AggregateDataStore):number=>{
    let bonusPoints:number = 0;
    let favBelowMaxRating:number = 0;
    let favAboveMaxRating:number = 0;
    let nonFavBelowMaxRating:number = 0;
    let nonFavAboveMaxRating:number = 0;

    _.forEach(state.character.skills, (skill:CharSkill)=>{
        let below:number = 0;
        let above:number = 0;
        if(skill.value>SKILL_NON_BONUS_MAX_RATING) {
            below =SKILL_NON_BONUS_MAX_RATING;
            above = skill.value-SKILL_NON_BONUS_MAX_RATING;
        } else {
            below = skill.value;
        }

        if(skill.favored===SkillAptitude.regular) {
            nonFavBelowMaxRating+=below;
            nonFavAboveMaxRating+=above;
        } else {
            favBelowMaxRating+=below;
            favAboveMaxRating+=above;
        }
    });

    if(nonFavBelowMaxRating>BASE_SKILLS) {
        bonusPoints = (nonFavBelowMaxRating-BASE_SKILLS)*SystemDataStore.bonusPoints.regularSkill +
            favBelowMaxRating*SystemDataStore.bonusPoints.favoredSkill;
    } else if((nonFavBelowMaxRating+favBelowMaxRating)>BASE_SKILLS) {
        var nonFavBaseSkills = BASE_SKILLS-nonFavBelowMaxRating;
        bonusPoints = (favBelowMaxRating-nonFavBaseSkills)*SystemDataStore.bonusPoints.favoredSkill;
    }
    bonusPoints+= (favAboveMaxRating*SystemDataStore.bonusPoints.favoredSkill + nonFavAboveMaxRating*SystemDataStore.bonusPoints.regularSkill);
    return bonusPoints;
}

export const BonusPointsReducer = (state: AggregateDataStore = AggregateDataStoreInitialState, action: PossibleBonusPointActions): AggregateDataStore => {
    console.log("BonusPointsReducer."+action.type+"("+JSON.stringify(action)+")");
    let bonusPoints : number ;
    switch (action.type) {
        case AttributeActionTypesConsts.SET_ATTRIBUTE:
            bonusPoints = CalculateAttributeBonusPoints(state);
            return deepAssign({},state, {character:{bonusPoints:{attributes: bonusPoints}}});
        case SkillActionTypeConsts.SET_SKILL:
            bonusPoints = CalculateSkillBonusPoints(state);
            return deepAssign({},state, {character:{bonusPoints: {skills: bonusPoints}}});
        default:
            return state;
    }
}

