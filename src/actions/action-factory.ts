import {strEnum} from "../helpers/str-enum";

export const ActionTypesConsts = strEnum([
    "INCREMENT_COUNTER",
    "RESET_COUNTER"
]);
export type ActionTypes = keyof typeof ActionTypesConsts;



export type Action = {
    type: "INCREMENT_COUNTER",
    delta: number,
} | {
    type: "RESET_COUNTER",
}

export const incrementCounter = (delta: number): Action => ({
    type: ActionTypesConsts.INCREMENT_COUNTER,
    delta,
})

export const resetCounter = (): Action => ({
    type: ActionTypesConsts.RESET_COUNTER,
})