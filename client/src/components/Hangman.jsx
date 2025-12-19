import { useEffect, useMemo, useState } from "react";
import { WORD_LIST } from "../data/HangmanWords";
import { STAGES, LOGO } from "../data/HangmanArt";

function pickRandomWord() {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}

export default function Hangman() {
  const [word, setWord] = useState("");
  const [lives, setLives] = useState(6);
  const [guessed, setGuessed] = useState([]);
  const [message, setMessage] = useState("");
  const [guessInput, setGuessInput] = useState("");

  useEffect(() => {
    setWord(pickRandomWord());
  }, []);

  const display = useMemo(() => {
    if (!word) return "";
    return word
      .split("")
      .map((ch) => (guessed.includes(ch) ? ch : "_"))
      .join("");
  }, [word, guessed]);

  const gameOver = lives === 0 || (word && !display.includes("_"));
  function handleGuess(raw) {
    const guess = (raw || "").toLowerCase().trim();
    if (guess.length !== 1 || guess < "a" || guess > "z") {
      setMessage("Type a single letter (a-z).");
      return;
    }
    if (guessed.includes(guess)) {
      setMessage(`You've already guessed "${guess}"`);
      return;
    }
    if (word.includes(guess)) {
      setGuessed((prev) => {
        return [...prev, guess];
      });
      setMessage("");
    } else {
      setLives((prev) => Math.max(0, prev - 1));
      setMessage(
        `You guessed "${guess}", that's not in the word. You lose a life.`
      );
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    handleGuess(guessInput);
    setGuessInput("");
  }

  function resetGame() {
    setWord(pickRandomWord());
    setLives(6);
    setGuessed([]);
    setMessage("");
    setGuessInput("");
  }
  const win = word && !display.includes("_") && lives > 0;
  const lose = lives === 0;
  return (
    <div style={{ maxWidth: 520 }}>
      <pre>{LOGO}</pre>

      <pre style={{ fontFamily: "monospace", whiteSpace: "pre" }}>
        {STAGES[lives]}
      </pre>

      <div
        style={{
          margin: "12px 0",
          fontFamily: "monospace",
          fontSize: 24,
          letterSpacing: 6,
        }}
      >
        {display}
      </div>
      <div style={{ marginBottom: 8 }}>
        {"****************************"}
        <strong>{lives}</strong>/6 LIVES LEFT
        {"****************************"}
      </div>

      {message && (
        <div style={{ marginBottom: 8 }}>
          <strong>{message}</strong>
        </div>
      )}
      {lose && (
        <div style={{ marginBottom: 8 }}>
          <strong>YOU LOSE</strong> - word was:{" "}
          <span style={{ fontFamily: "monospace" }}>{word}</span>
        </div>
      )}

      {win && (
        <div style={{ marginBottom: 8 }}>
          <strong>YOU WIN</strong>
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={guessInput}
          onChange={(e) => setGuessInput(e.target.value)}
          maxLength={1}
          disabled={gameOver}
        />
        <button type="submit" disabled={gameOver}>
          Guess
        </button>
        <button type="button" onClick={resetGame}>
          Restart
        </button>
      </form>
    </div>
  );
}
