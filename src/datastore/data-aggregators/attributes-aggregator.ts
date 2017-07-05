

import {AggregateDataStore} from "../aggregate-datastore";
import {SystemDataStore} from "../system-static-store/system-data-store";
import {AttributeIdConsts} from "../system-static-store/system-attributes-store";
export interface  AggregatedAttribute {
    base: number,
    value: number
}


const getPrimaryAttributeValue = (state,base, attributeId: string):number => {
    return base + (state.character.attributes[attributeId].cost /
        SystemDataStore.attributes[attributeId].costPerRaise)*(SystemDataStore.attributes[attributeId].raiseStep||1);
}


export const AttributeAggregator = (state:AggregateDataStore, attributeId:string):AggregatedAttribute=>{

    var racialAttributeModifier = SystemDataStore.race[state.character.race.id].attributeModifiers[attributeId] || 0;
    var systemAttribute  = SystemDataStore.attributes[attributeId];
    var base;
    if(systemAttribute.base) {
        base = systemAttribute.base + racialAttributeModifier ;

    } else  if(systemAttribute.derived){
        base = AttributeAggregator(state,systemAttribute.derived).value;
    }
    else {
        base = calculateCustomBase(state,attributeId);
    }

    var value = systemAttribute.costPerRaise?getPrimaryAttributeValue(state,base,attributeId):base;
    return {base: base, value: value};

}

const calculateCustomBase = (state:AggregateDataStore, attributeId:string):number => {
    switch(attributeId) {
        case "speed":
            return (
                AttributeAggregator(state,AttributeIdConsts.dx).value +
                AttributeAggregator(state,AttributeIdConsts.ht).value)/4;
        case "move":
            return Math.floor(AttributeAggregator(state,AttributeIdConsts.speed).value);
        case "dodge":
            return Math.floor(AttributeAggregator(state,AttributeIdConsts.speed).value)+3;
        case "bl":
            return Math.pow(AttributeAggregator(state,AttributeIdConsts.st).value,2)/5;
        default:
            return 0;
    }

}