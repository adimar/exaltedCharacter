import {strEnum} from "../helpers/str-enum";
import {Action} from "redux";


export const SearchboxActionTypesConsts = strEnum([
    "GET_MATHING",
    "REGISTER_SEARCHBOX",
    "CLEAR_SEARCHBOX"
]);

export type SearchAction =  GetMatchingAction | RegisterSearchBoxAction;

export interface GetMatchingAction extends Action   {
    type: "GET_MATHING",
    searchBoxId:string,
    pattern: string

};



export interface RegisterSearchBoxAction extends Action   {
    type: "REGISTER_SEARCHBOX",
    searchBoxId:string,
    dataPath: string,
    valueField: string
    idField: string;
    excludePath?:string;
};

export const registerSearchBox  = (searchBoxId:string, dataPath:string, valueField:string, idField:string,excludePath?:string): RegisterSearchBoxAction => ({
    type: SearchboxActionTypesConsts.REGISTER_SEARCHBOX,
    searchBoxId:searchBoxId,
    dataPath: dataPath,
    valueField: valueField,
    idField: idField,
    excludePath:excludePath
});

export const getMatching  = (searchBoxId:string, pattern:string): GetMatchingAction => ({
    type: SearchboxActionTypesConsts.GET_MATHING,
    searchBoxId:searchBoxId,
    pattern:pattern
});
