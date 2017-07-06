import {SystemDataStore} from "../system-static-store/system-data-store";

export type RaceStore = {id: string};

export const CharacterRaceInitialState : RaceStore = {
    id: SystemDataStore.race.human.id
}