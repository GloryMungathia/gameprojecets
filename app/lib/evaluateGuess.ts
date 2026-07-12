export type LetterStatus = "correct" | "present" | "absent";

export function evaluateGuess(guess: string, answer: string): LetterStatus[] {
    const result: LetterStatus[] = Array(guess.length).fill("absent");
    const answerLetters = answer.split("");

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === answer[i]) {
            result[i] = "correct";
            answerLetters[i] = "#";
        }
    }

    for (let i = 0; i < guess.length; i++) {
        if (result[i] === "correct") continue;

        const indexInAnswer = answerLetters.indexOf(guess[i]);
        if (indexInAnswer !== -1) {
            result[i] = "present";
            answerLetters[indexInAnswer] = "#";
        }
    }

    return result;
}