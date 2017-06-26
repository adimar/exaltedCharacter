


import {strEnum} from "../helpers/str-enum";
export const AttributeIdConsts = strEnum(["st","dx","iq","ht","hp","will","per", "fp"]);
export type AttributeIdConstTypes = keyof typeof AttributeIdConsts;
export const PrimaryAttributeIdConsts = strEnum(["st","dx","iq","ht"]);
export type PrimaryAttributeIdConstTypes = keyof typeof PrimaryAttributeIdConsts;

import AttributesStore = SystemDataStore.AttributesStore;
export namespace SystemDataStore {

    export type Attribute = {
        name: string;
        costPerRaise: number;
        base?: number;
        derived?: PrimaryAttributeIdConstTypes;
    }

    export type AttributesStore = {[attributeId:string]: Attribute};



    export type All = {
        attributes: AttributesStore
    }
}


export const SystemAttributeStoreInitialState : AttributesStore = {
    st : {name:"ST", costPerRaise:10, base:10},
    dx : {name:"DX", costPerRaise:20, base:10},
    iq : {name:"IQ", costPerRaise:10, base:10},
    ht : {name:"HT", costPerRaise:10, base:10},
    hp : {name:"HP", costPerRaise:2, derived:PrimaryAttributeIdConsts.st},
    will : {name:"WILL", costPerRaise:5, derived:PrimaryAttributeIdConsts.iq},
    per : {name:"PER", costPerRaise:5, derived:PrimaryAttributeIdConsts.iq},
    fp : {name:"FP", costPerRaise:3, derived:PrimaryAttributeIdConsts.ht},
}


export const SystemDataStoreInitialState : SystemDataStore.All = {
    attributes: SystemAttributeStoreInitialState
}