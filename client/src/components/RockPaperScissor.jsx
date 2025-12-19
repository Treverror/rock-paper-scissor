import { useState } from "react";

const CHOICES = ["rock", "paper", "scissors"];

const ASCII_ART = [
  // rock = 0
  `
    _______
---'   ____)
      (_____)
      (_____)
      (____)
---.__(___)
`,
  // paper = 1
  `
    _______
---'   ____)____
          ______)
          _______)
         _______)
---.__________)
`,
  // scissors = 2
  `
    _______
---'   ____)____
          ______)
       __________)
      (____)
---.__(___)
`,
];

function getResult(userChoice, computerChoice) {
  if (userChoice < 0 || userChoice > 2) {
    return "You have typed an invalid choice.";
  } else if (userChoice === 0 && computerChoice === 2) {
    return "You Win!";
  } else if (userChoice === 2 && computerChoice === 0) {
    return "You lose.";
  } else if (computerChoice > userChoice) {
    return "You lose.";
  } else if (userChoice > computerChoice) {
    return "You Win!";
  } else {
    return "It's a draw.";
  }
}

function RockPaperScissors() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");

  function handleClick(choiceIndex) {
    const comp = Math.floor(Math.random() * 3);
    setUserChoice(choiceIndex);
    setComputerChoice(comp);
    setResult(getResult(choiceIndex, comp));
  }

  return (
    <div style={{ fontFamily: "monospace", textAlign: "center" }}>
      <h1>Rock, Paper, Scissors!</h1>
      <div style={{ marginBottom: "1rem" }}>
        {CHOICES.map((choice, index) => (
          <button
            key={choice}
            onClick={() => handleClick(index)}
            style={{
              margin: "1rem 0.5rem 0.5rem 0.5rem",
              padding: "0.5rem 1rem",
            }}
          >
            {choice.toUpperCase()}
          </button>
        ))}
      </div>
      {userChoice != null && computerChoice != null && (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
          >
            <div>
              <h2>you chose: {CHOICES[userChoice]}</h2>
              <pre>{ASCII_ART[userChoice]}</pre>
            </div>
            <div>
              <h2>Computer chose: {CHOICES[computerChoice]}</h2>
              <pre>{ASCII_ART[computerChoice]}</pre>
            </div>
          </div>
          <h2 style={{ marginTop: "3rem", fontSize: "2rem" }}>{result}</h2>
        </>
      )}
    </div>
  );
}

export default RockPaperScissors;
