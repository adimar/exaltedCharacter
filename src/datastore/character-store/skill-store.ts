export type CharSkill = {
    id:string;
    cost: number;
}


export type SkillsStore = {[skillId:string]: CharSkill};

export const CharacterSkillsStoreInitialState = {
    "archery":{"id":"archery","cost":0},
    "athletics":{"id":"athletics","cost":0},
    "awareness":{"id":"awareness","cost":0},
    "brawl":{"id":"brawl","cost":0},
    "bureaucracy":{"id":"bureaucracy","cost":0},
    "craft":{"id":"craft","cost":0},
    "dodge":{"id":"dodge","cost":0},
    "integrity":{"id":"integrity","cost":0},
    "investigation":{"id":"investigation","cost":0},
    "larceny":{"id":"larceny","cost":0},
    "linguistics":{"id":"linguistics","cost":0},
    "lore":{"id":"lore","cost":0},
    "martial arts":{"id":"martial arts","cost":0},
    "medicine":{"id":"medicine","cost":0},
    "melee":{"id":"melee","cost":0},
    "occult":{"id":"occult","cost":0},
    "performance":{"id":"performance","cost":0},
    "presence":{"id":"presence","cost":0},
    "resistance":{"id":"resistance","cost":0},
    "ride":{"id":"ride","cost":0},
    "sail":{"id":"sail","cost":0},
    "socialize":{"id":"socialize","cost":0},
    "stealth":{"id":"stealth","cost":0},
    "survival":{"id":"survival","cost":0},
    "thrown":{"id":"thrown","cost":0},
    "war":{"id":"war","cost":0}
}