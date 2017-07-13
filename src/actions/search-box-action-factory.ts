import {strEnum} from "../helpers/str-enum";
import {Action } from "redux";


export const SearchboxActionTypesConsts = strEnum([
    "GET_MATHING",
    "REGISTER_SEARCHBOX",
    "CLEAR_SEARCHBOX"
]);

export type SearchAction =  GetMatchingAction | RegisterSearchBoxAction | ClearSearchBoxAction;

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

export interface ClearSearchBoxAction extends Action {
    type: "CLEAR_SEARCHBOX",
    searchBoxId:string
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


export const clearSearchBox  = (searchBoxId:string): ClearSearchBoxAction => ({
    type: SearchboxActionTypesConsts.CLEAR_SEARCHBOX,
    searchBoxId:searchBoxId
});

export interface selectSearchBoxItemArguments {
    searchBoxId:string;
    selectedSearchItem:any;
    itemSelectionDispatch: (selectedSearchItem:any)=>void;
}

export const selectSearchBoxItem = (searchBoxId:string,  selectedSearchItem:any,itemSelectionDispatch: (selectedSearchItem:any)=>void )=> {

    var _searchBoxId:string = searchBoxId;
    var _selectedSearchItem:any = selectedSearchItem;
    var _itemSelectionDispatch: (selectedSearchItem:any)=>void = itemSelectionDispatch;
    console.log("searchboxSelectItem called for "+_searchBoxId+" selectedSearchItem:"+JSON.stringify(_selectedSearchItem));
    return (dispatch,getState) => {
        console.log("searchboxSelectItem dispatched "+_searchBoxId);
        dispatch(clearSearchBox(_searchBoxId));
        console.log("searchboxSelectItem itemSelectionDispatch "+_selectedSearchItem);
        _itemSelectionDispatch(_selectedSearchItem) ;
        console.log("searchboxSelectItem end");
    }

}