import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";

export const AttributeActionTypesConsts = strEnum([
    "SET_PRIMARY_ATTRIBUTE",
    "SET_DERIVED_ATTRIBUTE"
]);

//export type AttributeActionTypes = keyof typeof AttributeActionTypesConsts;


export type AttributeAction =  SetPrimaryAttributeAction | SetDerivedAttributeAction ;


export interface SetPrimaryAttributeAction extends Action   {
    type: "SET_PRIMARY_ATTRIBUTE",
    attributeId: string,
    value: number,
};

export interface SetDerivedAttributeAction extends Action {
    type: "SET_DERIVED_ATTRIBUTE",
    attributeId: string,
    cost: number
};


export const setPrimaryAttribute  = (attributeId:string, value: number): SetPrimaryAttributeAction => ({
    type: AttributeActionTypesConsts.SET_PRIMARY_ATTRIBUTE,
    attributeId: attributeId,
    value: value,
});

export const setDerivedAttribute  = (attributeId:string, cost: number): SetDerivedAttributeAction => ({
    type: AttributeActionTypesConsts.SET_DERIVED_ATTRIBUTE,
    attributeId: attributeId,
    cost: cost,
});
//
// export function setPrimarkAttributeThunk(attributeId:string, value: number) {
//     return function(dispatch) {
//         dispatch(setPrimaryAttribute(attributeId,value));
//         dispatch
//     };
// }