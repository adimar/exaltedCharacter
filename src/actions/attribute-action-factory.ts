import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";

export const AttributeActionTypesConsts = strEnum([
    "SET_PRIMARY_ATTRIBUTE",
    "SET_DERIVED_ATTRIBUTE",
    "INITIALIZE_ATTRIBUTES"
]);

//export type AttributeActionTypes = keyof typeof AttributeActionTypesConsts;


export type AttributeAction =  SetPrimaryAttributeAction | SetDerivedAttributeAction | InitializeAttributesAction;


export type SetPrimaryAttributeAction  = {
    type: "SET_PRIMARY_ATTRIBUTE",
    attributeId: string,
    value: number,
};

export type SetDerivedAttributeAction = {
    type: "SET_DERIVED_ATTRIBUTE",
    attributeId: string,
    cost: number
};

export type InitializeAttributesAction = {
    type: "INITIALIZE_ATTRIBUTES"
};


export const setPrimaryAttribute = (attributeId:string, value: number): SetPrimaryAttributeAction => ({
    type: AttributeActionTypesConsts.SET_PRIMARY_ATTRIBUTE,
    attributeId: attributeId,
    value: value,
});

export const setDerivedAttribute = (attributeId:string, cost: number): SetDerivedAttributeAction => ({
    type: AttributeActionTypesConsts.SET_DERIVED_ATTRIBUTE,
    attributeId: attributeId,
    cost: cost,
});


export const initializeAttribute = (): AttributeAction => ({
    type: AttributeActionTypesConsts.INITIALIZE_ATTRIBUTES,
})