"use client";

import { useState, useEffect } from "react";
import Board from "./components/Board";
import Keyboard from "./components/keyboard";
import { getRandomWordEntry } from "./lib/words";

export default function Home() {
  const [wordEntry, setWordEntry] = useState(getRandomWordEntry());
  const answer = wordEntry.word;

  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<"playing" | "won" | "lost">("playing");

  function handleKeyPress(key: string) {
    if (gameStatus !== "playing") return;

    if (key === "ENTER") {
      return;
    }

    if (key === "BACKSPACE") {
      setCurrentGuess(currentGuess.slice(0, -1));
      return;
    }

    if (currentGuess.length < 5) {
      const newGuess = currentGuess + key;
      setCurrentGuess(newGuess);

      if (newGuess.length === 5) {
        const newGuesses = [...guesses, newGuess];
        setGuesses(newGuesses);
        setCurrentGuess("");

        if (newGuess === answer) {
          setGameStatus("won");
        } else if (newGuesses.length === 6) {
          setGameStatus("lost");
        }
      }
    }
  }

  function resetGame() {
    setWordEntry(getRandomWordEntry());
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
  }

  useEffect(() => {
    function handlePhysicalKeydown(e: KeyboardEvent) {
      if (e.key === "Enter") {
        handleKeyPress("ENTER");
      } else if (e.key === "Backspace") {
        handleKeyPress("BACKSPACE");
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        handleKeyPress(e.key.toUpperCase());
      }
    }

    window.addEventListener("keydown", handlePhysicalKeydown);
    return () => window.removeEventListener("keydown", handlePhysicalKeydown);
  }, [currentGuess, guesses, gameStatus]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold">Word Puzzle</h1>
      <p className="text-gray-400 text-center max-w-xs">💡 Hint: {wordEntry.hint}</p>

      <Board guesses={guesses} currentGuess={currentGuess} answer={answer} />
      <Keyboard onKeyPress={handleKeyPress} />

      {gameStatus === "won" && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-bold text-green-500">🎉 You won!</div>
          <button
            onClick={resetGame}
            className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded"
          >
            Play Again
          </button>
        </div>
      )}

      {gameStatus === "lost" && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-2xl font-bold text-red-500">
            Game over — the word was {answer}
          </div>
          <button
            onClick={resetGame}
            className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded"
          >
            Play Again
          </button>
        </div>
      )}
    </main>
  );
}