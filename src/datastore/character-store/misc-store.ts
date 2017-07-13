

export type SingleSearchElementData = {
    idField:string,
    valueField:string,
    pattern?: string,
    possibleObjectList: {[id:string]:any},
    matches: {[id:string]:any},
    excludePath: string,
    searchBoxPattern:string;
}

export type SearchElementStore = {
    [searchBoxId:string]: SingleSearchElementData
}

export type MiscStore = {searchElement: SearchElementStore};

export const MiscStoreInitialState = {
    searchElement: {}
}