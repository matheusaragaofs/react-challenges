import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(2);
  const [confirmDifficulty, setConfirmDifficulty] = useState(false);
  const [sneakQtt, setSneakQtt] = useState();

  return (
    <div className=" rounded-lg w-full h-full text-white">
      {!confirmDifficulty ? (
        <div className="h-full w-full">
          <div className="font-bold text-2xl mb-2">Memory Game 🕵️</div>

          <span className="text-sm">Choose the difficulty:</span>
          <div className="space-x-3 space-y-3 mt-2  ">
            <button
              className=" rounded-lg px-4 py-3 bg-white/20 shadow-lg hover:scale-110 transition-all"
              onClick={() => {
                setBoardSize(4);
                setConfirmDifficulty(true);
              }}
            >
              {"easy 😊 "}
            </button>
            <button
              className="outline-none  rounded-lg px-4 py-3 bg-white/20 shadow-lg hover:scale-110 transition-all"
              onClick={() => {
                setBoardSize(6);
                setSneakQtt(1);
                setConfirmDifficulty(true);
              }}
            >
              {"medium 😐 "}
            </button>
            <button
              className=" rounded-lg px-4 py-3 bg-white/20 shadow-lg hover:scale-110 transition-all"
              onClick={() => {
                setBoardSize(8);
                setSneakQtt(2);
                setConfirmDifficulty(true);
              }}
            >
              {"hard 😈 "}
            </button>
            <button
              className=" rounded-lg px-4 py-3 bg-white/20 shadow-lg hover:scale-110 transition-all"
              onClick={() => {
                setSneakQtt(4);
                setBoardSize(10);
                setConfirmDifficulty(true);
              }}
            >
              {"impossible 🔥 "}
            </button>
          </div>
        </div>
      ) : (
        <Board boardSize={boardSize} sneakQtt={sneakQtt} />
      )}
    </div>
  );
}

export default App;
