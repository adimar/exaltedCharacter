export type SearchIdValuePair = {id:string,value:string};

export type SingleSearchElementData = {
    pattern?: string,
    possibleObjectList: SearchIdValuePair[],
    matches: SearchIdValuePair[]}

export type SearchElementStore = {
    [searchBoxId:string]: SingleSearchElementData
}

export type MiscStore = {searchElement: SearchElementStore};

export const MiscStoreInitialState = {
    searchElement: {}
}