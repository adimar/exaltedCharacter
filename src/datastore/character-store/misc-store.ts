
export type MiscStore = {
        essence: number,
        willpower: number,
        personal: number,
        peripheral: number,
        committed: number
    };

export const MiscStoreInitialState: MiscStore = {
    essence: 1,
    willpower: 5,
    personal: -1,
    peripheral: -1,
    committed: -1
}