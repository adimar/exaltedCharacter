export type SearchElementValue = {
    [id:string]:string
}

export type MiscStore = {searchElement: SearchElementValue};

export const MiscStoreInitialState = {
    searchElement: {}
}