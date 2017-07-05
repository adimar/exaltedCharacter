import {strEnum} from "../../helpers/str-enum";
import {SystemDataStore} from "./system-data-store";
import {SystemDataAggregators} from "../data-aggregators/system-data-aggregators";
export const AttributeIdConsts = strEnum(["st", "dx", "iq", "ht", "hp", "will", "per", "fp", "strike", "move", "speed","dodge","bl"]);
export type AttributeIdConstTypes = keyof typeof AttributeIdConsts;
export const PrimaryAttributeIdConsts = strEnum(["st", "dx", "iq", "ht"]);
export type PrimaryAttributeIdConstTypes = keyof typeof PrimaryAttributeIdConsts;


type StrengthDataTables = { damage: { [level: number]: { swing: string, thrust: string } } };

type AttributesStore = { [attributeId: string]: SystemAttribute };

type SystemAttribute = {
    name: string;
    costPerRaise?: number;
    raiseStep?: number;
    base?: number;
    derived?: string;
    data?: StrengthDataTables
}

const StrengthDataTableInitialState: StrengthDataTables = {
    damage: {
        1: {swing: "1d-5", thrust: "1d-6"},
        2: {swing: "1d-5", thrust: "1d-6"},
        3: {swing: "1d-4", thrust: "1d-5"},
        4: {swing: "1d-4", thrust: "1d-5"},
        5: {swing: "1d-3", thrust: "1d-4"},
        6: {swing: "1d-3", thrust: "1d-4"},
        7: {swing: "1d-2", thrust: "1d-3"},
        8: {swing: "1d-2", thrust: "1d-3"},
        9: {swing: "1d-1", thrust: "1d-2"},
        10: {swing: "1d", thrust: "1d-2"},
        11: {swing: "1d+1", thrust: "1d-1"},
        12: {swing: "1d+2", thrust: "1d-1"},
        13: {swing: "2d-1", thrust: "1d"},
        14: {swing: "2d", thrust: "1d"},
        15: {swing: "2d+1", thrust: "1d+1"},
        16: {swing: "2d+2", thrust: "1d+1"},
        17: {swing: "3d-1", thrust: "1d+2"},
        18: {swing: "3d", thrust: "1d+2"},
        19: {swing: "3d+1", thrust: "2d-1"},
        20: {swing: "3d+2", thrust: "2d-1"},
        21: {swing: "4d-1", thrust: "2d"},
        22: {swing: "4d", thrust: "2d"},
        23: {swing: "4d+1", thrust: "2d+1"},
        24: {swing: "4d+2", thrust: "2d+1"},
        25: {swing: "5d-1", thrust: "2d+2"},
        26: {swing: "5d", thrust: "2d+2"},
    }
}

export const SystemAttributeStoreInitialState: AttributesStore = {
    st: {name: "ST", costPerRaise: 10, base: 10, data: StrengthDataTableInitialState},
    dx: {name: "DX", costPerRaise: 20, base: 10},
    iq: {name: "IQ", costPerRaise: 20, base: 10},
    ht: {name: "HT", costPerRaise: 10, base: 10},
    hp: {name: "HP", costPerRaise: 2, derived: PrimaryAttributeIdConsts.st},
    will: {name: "WIL", costPerRaise: 5, derived: PrimaryAttributeIdConsts.iq},
    per: {name: "PER", costPerRaise: 5, derived: PrimaryAttributeIdConsts.iq},
    fp: {name: "FP", costPerRaise: 3, derived: PrimaryAttributeIdConsts.ht},
    strike: {name: "Striking Strength", costPerRaise: 5, derived: PrimaryAttributeIdConsts.st},
    speed: {name: "Basic Speed",costPerRaise: 5,raiseStep: 0.25},
    move: { name: "Basic Move",costPerRaise: 5},
    dodge: {name: "Dodge"},
    bl: {name: "Basic Lift"}
}


// type DerivedCalculationFunction = (state: any) => number;
// const genericCalculateDerivedAttribute = (attributeId: string,derivedAttributeId: string) => {
//     let _attributeId: string = attributeId;
//     let _derivedAttributeId: string = derivedAttributeId;
//     var base =  function (state): number {
//         return getPrimaryAttributeValue(state, _attributeId);
//     }
//
//     var value = function (state): number {
//         return getDerivedAttributeValue(state,base,_derivedAttributeId);
//     }
//
//     return {base: base, value:value};
// }
//
// const getPrimaryAttributeValue = (state, attributeId: string): number => {
//     return state.character.attributes[attributeId].value || SystemDataStore.attributes[attributeId].base;
// }
//
// const getDerivedAttributeValue = (state,base, derivedAttributeId: string):number => {
//
//     return base(state) + (state.character.attributes[derivedAttributeId].cost /
//         SystemDataStore.attributes[derivedAttributeId].costPerRaise)*(SystemDataStore.attributes[derivedAttributeId].raiseStep||1);
// }
//
// export const SystemAttributeStoreInitialState: AttributesStore = {
//     st: {name: "ST", costPerRaise: 10, base: 10, data: StrengthDataTableInitialState},
//     dx: {name: "DX", costPerRaise: 20, base: 10},
//     iq: {name: "IQ", costPerRaise: 20, base: 10},
//     ht: {name: "HT", costPerRaise: 10, base: 10},
//     hp: {name: "HP", costPerRaise: 2, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.st, AttributeIdConsts.hp)},
//     will: {name: "WIL", costPerRaise: 5, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.iq, AttributeIdConsts.will)},
//     per: {name: "PER", costPerRaise: 5, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.iq, AttributeIdConsts.per)},
//     fp: {name: "FP", costPerRaise: 3, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.ht, AttributeIdConsts.fp)},
//     strike: {
//         name: "Striking Strength",
//         costPerRaise: 5,
//         derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.st, AttributeIdConsts.strike)
//     },
//     speed: {
//         name: "Basic Speed",
//         costPerRaise: 5,
//         raiseStep: 0.25,
//         derived: {base: (state) => (
//             getPrimaryAttributeValue(state,PrimaryAttributeIdConsts.dx)+
//             getPrimaryAttributeValue(state,PrimaryAttributeIdConsts.ht)
//         ) / 4,
//         value: (state)=> getDerivedAttributeValue(state, SystemDataStore.attributes.speed.derived.base,AttributeIdConsts.speed)}
//     },
//     move: {
//         name: "Basic Move",
//         costPerRaise: 5,
//         derived: {base: (state) => {
//             return Math.floor((
//                     getPrimaryAttributeValue(state,PrimaryAttributeIdConsts.dx)+
//                     getPrimaryAttributeValue(state,PrimaryAttributeIdConsts.ht) +
//                     (state.character.attributes.speed.cost / SystemDataStore.attributes.speed.costPerRaise)
//                 ) / 4);
//         }, value:  (state)=> getDerivedAttributeValue(state, SystemDataStore.attributes.move.derived.base,AttributeIdConsts.move)}
//     },
//     dodge: {
//         name: "Dodge",
//         derived: {base: (state) => {
//             return Math.floor((
//                         getPrimaryAttributeValue(state,PrimaryAttributeIdConsts.dx)+
//                         getPrimaryAttributeValue(state,PrimaryAttributeIdConsts.ht) +
//                         (state.character.attributes.speed.cost / SystemDataStore.attributes.speed.costPerRaise)
//                     ) / 4)+3;
//         }, value:  null}
//     },
//     bl: {
//         name: "Basic Lift",
//         derived: {
//
//             base:  (state)=> Math.pow(getPrimaryAttributeValue(state,PrimaryAttributeIdConsts.st),2)/5,
//             value: null
//         }
//     }
//
// }
//


