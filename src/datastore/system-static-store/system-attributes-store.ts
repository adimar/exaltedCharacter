import {strEnum} from "../../helpers/str-enum";
var  ExaltedAttributes = require("./raw-data/exalted-attributes.json");

import * as _ from "lodash";

export const AttributeIdConsts = strEnum(["strength","dexterity","stamina","charisma","manipulation","appearance","perception","intelligence","wits"]);
export type AttributeIdConstTypes = keyof typeof AttributeIdConsts;

export const AttributeGroupConsts = strEnum(["physical","social","mental"]);
export type AttributeGroupConstsTypes = keyof typeof AttributeGroupConsts;

type AttributesStore = { [attributeId: string]: SystemAttribute };


type SystemAttribute = {
    id: string;
    name: string;
    group: AttributeGroupConstsTypes;
    base:number;
}

export const SystemAttributeStoreInitialState: AttributesStore = ExaltedAttributes;

