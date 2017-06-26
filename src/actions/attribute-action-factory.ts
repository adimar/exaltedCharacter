import {strEnum} from "../helpers/str-enum";

export const AttributeActionTypesConsts = strEnum([
    "SET_PRIMARY_ATTRIBUTE",
    "SET_DERIVED_ATTRIBUTE",
    "INITIALIZE_ATTRIBUTES"
]);

export type AttributeActionTypes = keyof typeof AttributeActionTypesConsts;


export type AttributeAction = {
    type: "SET_PRIMARY_ATTRIBUTE",
    attributeId: string,
    value: number,
} | {
    type: "SET_DERIVED_ATTRIBUTE",
    attributeId: string,
    cost: number
} | {
    type: "INITIALIZE_ATTRIBUTES"
}


export const setPrimaryAttribute = (attributeId:string, value: number): AttributeAction => ({
    type: AttributeActionTypesConsts.SET_PRIMARY_ATTRIBUTE,
    attributeId: attributeId,
    value: value,
})

export const setDerivedAttribute = (attributeId:string, cost: number): AttributeAction => ({
    type: AttributeActionTypesConsts.SET_DERIVED_ATTRIBUTE,
    attributeId: attributeId,
    cost: cost,
})


export const initializeAttribute = (): AttributeAction => ({
    type: AttributeActionTypesConsts.INITIALIZE_ATTRIBUTES,
})