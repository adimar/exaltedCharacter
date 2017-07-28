import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";

export const AttributeActionTypesConsts = strEnum([
    "SET_ATTRIBUTE"

]);

//export type AttributeActionTypes = keyof typeof AttributeActionTypesConsts;


export type AttributeActions =  SetAttributeAction  ;


export interface SetAttributeAction extends Action   {
    type: "SET_ATTRIBUTE",
    attributeId: string,
    value: number,
};


export const setAttribute  = (attributeId:string, value: number): SetAttributeAction => ({
    type: AttributeActionTypesConsts.SET_ATTRIBUTE,
    attributeId: attributeId,
    value: value,
});
