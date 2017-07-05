type AttributeModifiers = {
    [attributeId: string]: number
}

type Race = {
    id: string;
    name: string;
    attributeModifiers: AttributeModifiers

}


type RacesStore = { [raceId: string]: Race };

export const RaceInitialState: RacesStore = {
    human: {id: "human", name: "Human", attributeModifiers: {}},
    elf: {
        id: "elf",
        name: "Elf",
        attributeModifiers: {dx: 2}
    },
    dwarf: {
        id: "dwarf", name: "Dwarf",
        attributeModifiers: {st:1,ht:1}
    }
}
