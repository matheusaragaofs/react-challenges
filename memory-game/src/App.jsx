import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(2);
  const [confirmDifficulty, setConfirmDifficulty] = useState(false);

  return (
    <div className=" rounded-lg w-full h-full">
      {!confirmDifficulty ? (
        <div className="h-full w-full">
          <div className="font-bold text-lg mb-2">Mermory Game 🕵️</div>

          <span className="text-sm">Choose the difficulty:</span>
          <div className="space-x-3">
            <button
              onClick={() => {
                setBoardSize(4);
                setConfirmDifficulty(true);
              }}
            >
              {"easy 😊 "}
            </button>
            <button
              onClick={() => {
                setBoardSize(6);
                setConfirmDifficulty(true);
              }}
            >
              {"medium 😐 "}
            </button>
            <button
              onClick={() => {
                setBoardSize(8);
                setConfirmDifficulty(true);
              }}
            >
              {"hard 😈 "}
            </button>
            <button
              onClick={() => {
                setBoardSize(10);
                setConfirmDifficulty(true);
              }}
            >
              {"impossible 🔥 "}
            </button>
          </div>
        </div>
      ) : (
        <Board boardSize={boardSize} />
      )}
    </div>
  );
}

export default App;
