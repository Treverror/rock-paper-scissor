import { useState } from "react";
import Header from "./components/Header";
import RockPaperScissors from "./components/RockPaperScissor";
import Hangman from "./components/Hangman";
import CaesarCipher from "./components/CaesarCipher";
import "./App.css";
import Calculator from "./components/Calculator";

function App() {
  const [game, setGame] = useState("rps");

  return (
    <div className="app">
      <Header />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setGame("rps")}>Rock Paper Scissors</button>
        <button onClick={() => setGame("hangman")}>Hangman</button>
        <button onClick={() => setGame("caesar")}>Caesar Cipher</button>
        <button onClick={() => setGame("calc")}>Calculator</button>
      </div>
      <div className="gameArea" style={{ marginTop: 16 }}>
        {game === "rps" && <RockPaperScissors />}
        {game === "hangman" && <Hangman />}
        {game === "caesar" && <CaesarCipher />}
        {game === "calc" && <Calculator />}
      </div>
    </div>
  );
}

export default App;
