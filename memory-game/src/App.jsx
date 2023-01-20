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
        <input
          onChange={(e) => {
            setBoardSize(Number(e.target.value));
          }}
          min={2}
          max={7}
          defaultValue={2}
          type='range'
        />
        <div>
          {boardSize} x {boardSize}
        </div>
        <button onClick={() =>  setConfirmSize(true)}>Confirmar</button>
      </div>
    );
  return <Board boardSize={boardSize} />;
}

export default App;
