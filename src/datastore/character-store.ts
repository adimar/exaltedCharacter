export namespace DataStore {

    export type Counter = { value: number };

    export type All = {
        counter: Counter
    }
}


export const CounterDatastoreInitialState: DataStore.Counter = {
    value: 0,
}

export const AllDatastoreInitialState: DataStore.All = {
    counter: CounterDatastoreInitialState
}
