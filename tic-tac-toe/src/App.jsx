import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const players = {
    playerOne: {
      number: 1,
      shape: "X",
    },
    playerTwo: {
      number: 2,
      shape: "O",
    },
  };
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(players.playerOne);
  const [disabledBoard, setDisabledBoard] = useState(false);
  const [draw, setDraw] = useState(false);
  const [match, setMatch] = useState(false);

  const [winnerMatchConfig, setWinnerMatchConfig] = useState({
    orientation: "",
    position: "",
  });

  const [boardPlays, setBoardPlays] = useState([
    { player: null, index: 1 },
    { player: null, index: 2 },
    { player: null, index: 3 },
    { player: null, index: 4 },
    { player: null, index: 5 },
    { player: null, index: 6 },
    { player: null, index: 7 },
    { player: null, index: 8 },
    { player: null, index: 9 },
  ]);

  useEffect(() => {
    if (draw && !match) {
      setTimeout(() => {
        alert("DRAW");
        location.reload();
      }, 100);
    }

    if (match)
      setTimeout(() => {
        alert(`THERE IS A MATCH`);
        location.reload();
      }, 100);
  }, [match, draw]);

  const parseIndex = ({ index, orientation }) => {
    switch (index) {
      case 1:
        return orientation === "vertical" ? "first" : "third";

      case 2:
        return "second";

      case 3:
        return orientation === "vertical" ? "third" : "first";

      default:
        "none";
        break;
    }
  };
  const checkMatchedRows = (rows, orientation) => {
    const checkIfPlayersAreEqual = (player, row) =>
      player.number == row[0].player.number;

    rows.forEach((row, index) => {
      const findMatch = row.every(
        ({ player }) => player != null && checkIfPlayersAreEqual(player, row)
      );

      if (findMatch) {
        setMatch(true);
        setDisabledBoard(true);
        setWinnerMatchConfig({
          orientation,
          position: parseIndex({ index: index + 1, orientation }),
        });
      }
    });
  };
  const getDiagonals = (rows) => {
    let diagonals = [[], []];

    rows.forEach((row, i1) => {
      row.forEach((player, i2) => {
        if (i1 == i2) diagonals[0][i1] = player;
      });
    });

    rows.reverse().forEach((row, i1) => {
      row.forEach((player, i2) => {
        if (i1 == i2) diagonals[1][i1] = player;
      });
    });

    return diagonals;
  };
  const checkIfThereIsAWinner = (board) => {
    const boardSeparatedByRows = [
      board.slice(0, 3),
      board.slice(3, 6),
      board.slice(6, 9),
    ];
    const diagonals = getDiagonals(boardSeparatedByRows);

    let verticalArray = [[], [], []];

    boardSeparatedByRows.forEach((rows, index) => {
      rows.forEach((player, secondIndex) => {
        verticalArray[secondIndex][index] = player;
      });
    });

    checkMatchedRows(boardSeparatedByRows, "horizontal");
    checkMatchedRows(verticalArray, "vertical");
    checkMatchedRows([diagonals[0]], "left_diagonal");
    checkMatchedRows([diagonals[1]], "right_diagonal");

    if (board.every(({ player }) => player !== null) && !match) {
      return setDraw(true);
    }
  };

  const handlePlayerClick = (index) => {
    if (disabledBoard) return;
    if (currentPlayerTurn.number === 1) {
      let boardPlaysCopy = [...boardPlays];
      if (boardPlaysCopy[index].player) return;

      boardPlaysCopy[index].player = players.playerOne;

      setBoardPlays(boardPlaysCopy);
      checkIfThereIsAWinner(boardPlaysCopy);
      setCurrentPlayerTurn(players.playerTwo);
    } else {
      let boardPlaysCopy = [...boardPlays];
      if (boardPlaysCopy[index].player) return;

      boardPlaysCopy[index].player = players.playerTwo;

      setBoardPlays(boardPlaysCopy);
      checkIfThereIsAWinner(boardPlaysCopy);
      setCurrentPlayerTurn(players.playerOne);
    }
  };

  const yAxisConfig = {
    first: "top-[15%]",
    second: "top-[50%]",
    third: "top-[80%]",
  };

  const xAxisConfig = {
    first: "-left-[33%]",
    second: "left-0",
    third: "left-[33%]",
  };

  const configs = {
    vertical: `rotate-90 top-[50%] ${
      xAxisConfig[`${winnerMatchConfig.position}`]
    }`,
    left_diagonal: `rotate-45 top-[50%]`,
    right_diagonal: "-rotate-45 top-[50%]",
    horizontal: `rotate-30 ${yAxisConfig[`${winnerMatchConfig.position}`]}`,
  };

  return (
    <div className="App">
      {!winnerMatchConfig.orientation &&
      <div className="font-bold bg-white text-black/90 p-2 rounded-lg w-fit m-auto mb-2">
        Current Player {currentPlayerTurn.number} : {currentPlayerTurn.shape}
      </div>
      }
      <div
        className="select-none relative cursor-pointer bg-gradient-to-r from-blue-400 to-green-500 rounded-2xl"
        style={{
          width: 500,
          height: 500,
          display: "grid",
          gridTemplateRows: "1fr 1fr 1fr",
          gridTemplateColumns: "1fr 1fr 1fr",
        }}
      >
        {boardPlays.map((pos, index) => {
          return (
            <div
              key={index}
              onClick={() => handlePlayerClick(index)}
              className=" hover:bg-blue-200/20 rounded-2xl transition flex items-center justify-center relative"
            >
              <div className="absolute top-0 left-0 pl-5 text-white text-lg">
                {pos.index}
              </div>
              <div className="text-3xl font-bold text-cyan-900/90">
                {pos?.player?.shape}
              </div>
            </div>
          );
        })}
        {winnerMatchConfig.orientation && (
          <div
            id="line-winner-match"
            className={`w-full h-1 absolute bg-white ${
              configs[`${winnerMatchConfig.orientation}`]
            }`}
          />
        )}
      </div>
    </div>
  );
}

export default App;
