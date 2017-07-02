import {strEnum} from "../../helpers/str-enum";
import {SystemDataStore} from "./system-data-store";
export const AttributeIdConsts = strEnum(["st", "dx", "iq", "ht", "hp", "will", "per", "fp", "strike", "move", "speed"]);
export type AttributeIdConstTypes = keyof typeof AttributeIdConsts;
export const PrimaryAttributeIdConsts = strEnum(["st", "dx", "iq", "ht"]);
export type PrimaryAttributeIdConstTypes = keyof typeof PrimaryAttributeIdConsts;


type StrengthDataTables = { damage: { [level: number]: { swing: string, thrust: string } } };

export type AttributesStore = { [attributeId: string]: Attribute };

export type DerivedCalculationFunction = (state: any) => number;

type Attribute = {
    name: string;
    costPerRaise?: number;
    raiseStep?: number;
    base?: number;
    derived?: DerivedCalculationFunction;
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
    }
}

const genericCalculateDerivedAttribute = (attributeId: string) => {
    let _attributeId: string = attributeId;
    return function (state): number {
        return getAttributeValue(state, _attributeId);
    }
}

const getAttributeValue = (state, attributeId: string): number => {
    return state.character.attributes[attributeId].value || SystemDataStore.attributes[attributeId].base;
}

export const SystemAttributeStoreInitialState: AttributesStore = {
    st: {name: "ST", costPerRaise: 10, base: 10, data: StrengthDataTableInitialState},
    dx: {name: "DX", costPerRaise: 20, base: 10},
    iq: {name: "IQ", costPerRaise: 20, base: 10},
    ht: {name: "HT", costPerRaise: 10, base: 10},
    hp: {name: "HP", costPerRaise: 2, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.st)},
    will: {name: "WIL", costPerRaise: 5, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.iq)},
    per: {name: "PER", costPerRaise: 5, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.iq)},
    fp: {name: "FP", costPerRaise: 3, derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.ht)},
    strike: {
        name: "Striking Strength",
        costPerRaise: 5,
        derived: genericCalculateDerivedAttribute(PrimaryAttributeIdConsts.st)
    },
    speed: {
        name: "Basic Speed",
        costPerRaise: 5,
        raiseStep: 0.25,
        derived: (state) => (
            getAttributeValue(state,PrimaryAttributeIdConsts.dx)+
            getAttributeValue(state,PrimaryAttributeIdConsts.ht)
        ) / 4
    },
    move: {
        name: "Basic Move",
        costPerRaise: 5,
        derived: (state) => {
            return Math.floor((
                    getAttributeValue(state,PrimaryAttributeIdConsts.dx)+
                    getAttributeValue(state,PrimaryAttributeIdConsts.ht) +
                    (state.character.attributes.speed.cost / SystemDataStore.attributes.speed.costPerRaise)
                ) / 4);
        }
    },
    dodge: {
        name: "Dodge",
        derived: (state) => {
            return Math.floor((
                        getAttributeValue(state,PrimaryAttributeIdConsts.dx)+
                        getAttributeValue(state,PrimaryAttributeIdConsts.ht) +
                        (state.character.attributes.speed.cost / SystemDataStore.attributes.speed.costPerRaise)
                    ) / 4)+3;
        }
    },
    bl: {
        name: "Basic Lift",

        derived: (state)=> Math.pow(getAttributeValue(state,PrimaryAttributeIdConsts.st),2)/5
    }

}



