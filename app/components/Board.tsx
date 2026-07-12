import { evaluateGuess, LetterStatus } from "../lib/evaluateGuess";

type BoardProps = {
  guesses: string[];
  currentGuess: string;
  answer: string;
};

const statusColors: Record<LetterStatus, string> = {
  correct: "bg-green-600 border-green-600",
  present: "bg-yellow-500 border-yellow-500",
  absent: "bg-gray-700 border-gray-700",
};

export default function Board({ guesses, currentGuess, answer }: BoardProps) {
  const rows = 6;
  const cols = 5;

  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, rowIndex) => {
        const isCurrentRow = rowIndex === guesses.length;
        const isSubmittedRow = rowIndex < guesses.length;
        const word = isCurrentRow ? currentGuess : guesses[rowIndex] || "";
        const statuses = isSubmittedRow ? evaluateGuess(word, answer) : [];

        return (
          <div key={rowIndex} className="flex gap-2">
            {Array.from({ length: cols }).map((_, colIndex) => {
              const colorClass = isSubmittedRow
                ? statusColors[statuses[colIndex]]
                : "border-gray-600";

              return (
                <div
                  key={colIndex}
                  className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase ${colorClass}`}
                >
                  {word[colIndex] || ""}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}