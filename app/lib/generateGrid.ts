export type Cell = { row: number; col: number };
export type Placement = { word: string; cells: Cell[] };
export const WORD_COLORS = [
    "#FFB3C1", "#A8DADC", "#C8B6FF", "#B5EAD7",
    "#FFDAC1", "#FFB7B2", "#E2F0CB", "#D5AAFF",
];

export function getWordColor(index: number) {
    return WORD_COLORS[index % WORD_COLORS.length];
}
const DIRECTIONS = [
    { dr: 0, dc: 1 }, // right
    { dr: 0, dc: -1 },// left
    { dr: 1, dc: 0 }, // down
    { dr: -1, dc: 0 },  // up
    { dr: 1, dc: 1 }, // down-right
    { dr: -1, dc: -1 }, // up-left
    { dr: 1, dc: -1 },// down-left
    { dr: -1, dc: 1 },// up-right
    /*dr and dc is short name for delta column and delta row, delta means "change in" */
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function generateGrid(words: string[], size: number = 15) {
    const grid: (string | null)[][] = Array.from({ length: size }, () =>
        Array(size).fill(null)
    );
    const placements: Placement[] = [];

    // Place longer words first — easier to fit them before space runs out
    const sortedWords = [...words].sort((a, b) => b.length - a.length);

    for (const word of sortedWords) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 200) {
            attempts++;
            const direction = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
            const startRow = Math.floor(Math.random() * size);
            const startCol = Math.floor(Math.random() * size);

            const cells: Cell[] = [];
            let valid = true;

            for (let i = 0; i < word.length; i++) {
                const row = startRow + direction.dr * i;
                const col = startCol + direction.dc * i;

                if (row < 0 || row >= size || col < 0 || col >= size) {
                    valid = false;
                    break;
                }

                const existing = grid[row][col];
                if (existing !== null && existing !== word[i]) {
                    valid = false;
                    break;
                }

                cells.push({ row, col });
            }

            if (valid) {
                cells.forEach((cell, i) => {
                    grid[cell.row][cell.col] = word[i];
                });
                placements.push({ word, cells });
                placed = true;
            }
        }
    }

    // Fill any empty cells with random letters
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (grid[row][col] === null) {
                grid[row][col] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
            }
        }
    }

    return { grid: grid as string[][], placements };
}