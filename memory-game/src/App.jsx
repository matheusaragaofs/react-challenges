import { useState } from "react";
import "./App.css";
import { Board } from "./components/Board";

function App() {
  const [boardSize, setBoardSize] = useState(2);
  const [confirmSize, setConfirmSize] = useState(false);

  if (!confirmSize)
    return (
      <div>
        Qual é o tamanho do board ?
        <div className="space-x-3 py-4">
          <button
            onClick={() => {
              setBoardSize(4);
              setConfirmSize(true);
            }}
          >
            {"fácil :) "}
          </button>
          <button
            onClick={() => {
              setBoardSize(6);
              setConfirmSize(true);
            }}
          >
            {"médio :| "}
          </button>
          <button    onClick={() => {
              setBoardSize(9);
              setConfirmSize(true);
            }}>{"difícil >:) "}</button>
        </div>
      </div>
    );
  return <Board boardSize={boardSize} />;
}

export default App;
