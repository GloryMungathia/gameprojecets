export type WordEntry = {
    word: string;
    hint: string;
};

export const WORD_LIST: WordEntry[] = [
    { word: "APPLE", hint: "A fruit that keeps the doctor away" },
    { word: "BRAVE", hint: "Not afraid, courageous" },
    { word: "CRANE", hint: "A tall bird, or a machine that lifts heavy things" },
    { word: "DANCE", hint: "Moving your body to music" },
    { word: "EAGLE", hint: "A large bird of prey, symbol of freedom" },
    { word: "FROST", hint: "Ice crystals that form on cold mornings" },
    { word: "GHOST", hint: "A spooky spirit" },
    { word: "HONEY", hint: "Sweet food made by bees" },
    { word: "IVORY", hint: "A creamy white color, from elephant tusks" },
    { word: "JOKER", hint: "A playful trickster, or a playing card" },
    { word: "KNIFE", hint: "A sharp tool for cutting" },
    { word: "LEMON", hint: "A sour yellow fruit" },
    { word: "MANGO", hint: "A sweet tropical fruit" },
    { word: "NOBLE", hint: "Having high moral character" },
    { word: "OCEAN", hint: "A vast body of salt water" },
    { word: "PIANO", hint: "A musical instrument with black and white keys" },
    { word: "QUILT", hint: "A stitched blanket" },
    { word: "ROBOT", hint: "A machine that can perform tasks automatically" },
    { word: "SNAKE", hint: "A legless reptile" },
    { word: "TIGER", hint: "A large striped big cat" },
    { word: "UNITY", hint: "Being together as one" },
    { word: "VIVID", hint: "Bright and intense" },
    { word: "WATER", hint: "You drink it, and it covers most of the Earth" },
    { word: "YIELD", hint: "To give way, or the amount produced" },
    { word: "ZEBRA", hint: "A striped animal related to horses" },
];

export function getRandomWordEntry(): WordEntry {
    const index = Math.floor(Math.random() * WORD_LIST.length);
    return WORD_LIST[index];
}