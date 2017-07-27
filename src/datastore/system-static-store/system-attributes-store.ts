import {strEnum} from "../../helpers/str-enum";
var  ExaltedAttributes = require("./raw-data/exalted-attributes.json");

import * as _ from "lodash";

export const AttributeGroups = strEnum(["physical","social","mental"]);
export type AttributeGroupTypes = keyof typeof AttributeGroups;


export const AttributeGroupRanks = strEnum(["primary","secondary","tertiary"]);
export type AttributeGroupRankTypes = keyof typeof AttributeGroupRanks;

export const SystemAttributesInitialRanks = {
    primary:8,
    secondary:6,
    tertiary:4
}
export const SystemAttributesMiscInitialState = {
    groupRankValues: SystemAttributesInitialRanks
}

//-------------------------------------------------------------------------------
export const AttributeIdConsts = strEnum(["strength","dexterity","stamina","charisma","manipulation","appearance","perception","intelligence","wits"]);
export type AttributeIdConstTypes = keyof typeof AttributeIdConsts;

type AttributesStore = { [attributeId: string]: SystemAttribute };
export type SystemAttribute = {
    id: string;
    name: string;
    group: AttributeGroupTypes;
}

export const SystemAttributeStoreInitialState: AttributesStore = ExaltedAttributes;

