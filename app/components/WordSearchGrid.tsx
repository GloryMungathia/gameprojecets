"use client";

import { useState } from "react";
import { Cell, Placement, getWordColor } from "../lib/generateGrid";

const CELL_SIZE = 32; // pixels, must match the grid math below

type WordSearchGridProps = {
    grid: string[][];
    placements: Placement[];
    foundWords: string[];
    onWordFound: (word: string) => void;
};

function cellsEqual(a: Cell, b: Cell) {
    return a.row === b.row && a.col === b.col;
}

function getLine(start: Cell, end: Cell): Cell[] {
    const dr = Math.sign(end.row - start.row);
    const dc = Math.sign(end.col - start.col);

    const rowDiff = Math.abs(end.row - start.row);
    const colDiff = Math.abs(end.col - start.col);
    if (rowDiff !== 0 && colDiff !== 0 && rowDiff !== colDiff) {
        return [start];
    }

    const length = Math.max(rowDiff, colDiff) + 1;
    const cells: Cell[] = [];
    for (let i = 0; i < length; i++) {
        cells.push({ row: start.row + dr * i, col: start.col + dc * i });
    }
    return cells;
}

function cellCenter(cell: Cell) {
    return {
        x: cell.col * CELL_SIZE + CELL_SIZE / 2,
        y: cell.row * CELL_SIZE + CELL_SIZE / 2,
    };
}

export default function WordSearchGrid({
    grid,
    placements,
    foundWords,
    onWordFound,
}: WordSearchGridProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [startCell, setStartCell] = useState<Cell | null>(null);
    const [currentPath, setCurrentPath] = useState<Cell[]>([]);

    function handleMouseDown(cell: Cell) {
        setIsDragging(true);
        setStartCell(cell);
        setCurrentPath([cell]);
    }

    function handleMouseEnter(cell: Cell) {
        if (!isDragging || !startCell) return;
        setCurrentPath(getLine(startCell, cell));
    }

    function handleMouseUp() {
        if (currentPath.length > 1) {
            checkSelection(currentPath);
        }
        setIsDragging(false);
        setStartCell(null);
        setCurrentPath([]);
    }

    function checkSelection(path: Cell[]) {
        for (const placement of placements) {
            if (foundWords.includes(placement.word)) continue;

            const matchesForward = cellsMatch(path, placement.cells);
            const matchesBackward = cellsMatch(path, [...placement.cells].reverse());

            if (matchesForward || matchesBackward) {
                onWordFound(placement.word);
                return;
            }
        }
    }

    function cellsMatch(a: Cell[], b: Cell[]) {
        if (a.length !== b.length) return false;
        return a.every((cell, i) => cellsEqual(cell, b[i]));
    }

    const size = grid.length;
    const pixelSize = size * CELL_SIZE;

    return (
        <div
            className="relative select-none rounded-2xl bg-white p-3 shadow-md border border-gray-200"
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            <div className="relative" style={{ width: pixelSize, height: pixelSize }}>
                {/* Letters */}
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((letter, colIndex) => {
                            const cell = { row: rowIndex, col: colIndex };
                            return (
                                <div
                                    key={colIndex}
                                    onMouseDown={() => handleMouseDown(cell)}
                                    onMouseEnter={() => handleMouseEnter(cell)}
                                    style={{
                                        width: CELL_SIZE,
                                        height: CELL_SIZE,
                                        fontFamily: "var(--font-baloo)",
                                    }}
                                    className="flex items-center justify-center text-sm font-bold text-gray-800 border border-gray-100 cursor-pointer relative z-10"
                                >
                                    {letter}
                                </div>
                            );
                        })}
                    </div>
                ))}

                {/* Highlight strokes drawn on top of the letters */}
                <svg
                    className="absolute top-0 left-0 pointer-events-none"
                    width={pixelSize}
                    height={pixelSize}
                >
                    {placements.map((placement, index) => {
                        if (!foundWords.includes(placement.word)) return null;
                        const start = cellCenter(placement.cells[0]);
                        const end = cellCenter(placement.cells[placement.cells.length - 1]);
                        return (
                            <line
                                key={placement.word}
                                x1={start.x}
                                y1={start.y}
                                x2={end.x}
                                y2={end.y}
                                stroke={getWordColor(index)}
                                strokeWidth={CELL_SIZE * 0.75}
                                strokeLinecap="round"
                                opacity={0.55}
                            />
                        );
                    })}

                    {isDragging && currentPath.length > 1 && (
                        <line
                            x1={cellCenter(currentPath[0]).x}
                            y1={cellCenter(currentPath[0]).y}
                            x2={cellCenter(currentPath[currentPath.length - 1]).x}
                            y2={cellCenter(currentPath[currentPath.length - 1]).y}
                            stroke="#94A3B8"
                            strokeWidth={CELL_SIZE * 0.75}
                            strokeLinecap="round"
                            opacity={0.5}
                        />
                    )}
                </svg>
            </div>
        </div>
    );
}