"use client";

import { useState, useEffect } from "react";
import WordSearchGrid from "./components/WordSearchGrid";
import { generateGrid, Placement, getWordColor } from "./lib/generateGrid";
import { getRandomTopicWords } from "./lib/topics";

export default function Home() {
  const [topic, setTopic] = useState<string | null>(null);
  const [grid, setGrid] = useState<string[][] | null>(null);
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);

  useEffect(() => {
    startNewGame();
  }, []);

  function startNewGame() {
    const { topic: newTopic, words } = getRandomTopicWords(10);
    const { grid: newGrid, placements: newPlacements } = generateGrid(words, 15);

    setTopic(newTopic);
    setGrid(newGrid);
    setPlacements(newPlacements);
    setFoundWords([]);
  }

  function handleWordFound(word: string) {
    setFoundWords((prev) => [...prev, word]);
  }

  if (!grid) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  const allFound = foundWords.length === placements.length;

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-8 bg-white">
      <div className="text-center">
        <h1
          className="text-5xl font-bold text-gray-800"
          style={{ fontFamily: "var(--font-baloo)" }}
        >
          🔍 Word Quest
        </h1>
        <p className="text-gray-500 mt-1">
          Hunt down every word hiding in the grid!
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-xl">
        {placements.map(({ word }, index) => {
          const found = foundWords.includes(word);
          const color = getWordColor(index);
          return (
            <span
              key={word}
              className="px-3 py-1 rounded-full text-sm font-bold transition-all"
              style={{
                backgroundColor: found ? color : "#F3F4F6",
                color: found ? "#374151" : "#9CA3AF",
                textDecoration: found ? "line-through" : "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>

      <WordSearchGrid
        grid={grid}
        placements={placements}
        foundWords={foundWords}
        onWordFound={handleWordFound}
      />

      {allFound && (
        <div className="flex flex-col items-center gap-4 mt-2">
          <div className="text-2xl font-bold text-gray-800">
            🎉 Nailed it! You were exploring: <span className="text-purple-500">{topic}</span>
          </div>
          <button
            onClick={startNewGame}
            className="text-white font-bold px-6 py-3 rounded-full shadow-md hover:scale-105 transition-transform"
            style={{ backgroundColor: "#C8B6FF" }}
          >
            🔁 Play Again
          </button>
        </div>
      )}
    </main>
  );
}