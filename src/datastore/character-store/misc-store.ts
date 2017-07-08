

export type SingleSearchElementData = {
    idField:string,
    valueField:string,
    pattern?: string,
    possibleObjectList: {[id:string]:any},
    matches: {[id:string]:any,
    }
}

export type SearchElementStore = {
    [searchBoxId:string]: SingleSearchElementData
}

export type MiscStore = {searchElement: SearchElementStore};

export const MiscStoreInitialState = {
    searchElement: {}
}