import { useState } from "react";
import "./App.css";
import { getEmoji, emojisLength } from "./emojis";

function App() {
  const lengthArray = 4;
  let board = new Array(lengthArray).fill("").map((e, index) => {
    return new Array(lengthArray).fill(1);
  });

  let newCurrEmoji = getEmoji();
  const getDiffEmojis = (board) => {
    if (lengthArray ** 2 > emojisLength) return;
    const emojiOccurrency = getOccurencesOfEmoji(board.flat(), newCurrEmoji);

    if (emojiOccurrency == 2) {
      newCurrEmoji = getEmoji();
      if (board.flat().includes(newCurrEmoji)) getDiffEmojis(board);

      return newCurrEmoji;
    }
    return newCurrEmoji;
  };
  const getOccurencesOfEmoji = (array, emoji) =>
    array.filter((el) => el == emoji).length;

  console.log("board:", board);
  let boardIdexes = [];
  for (let x = 0; x < lengthArray; x++) boardIdexes.push(x);

  const getRandomIndex = (boardIndexes) =>
    Math.floor(Math.random() * boardIndexes.length);

  const parsedBoardIndexes = {
    col: boardIdexes,
    row: boardIdexes,
  };
  board.forEach((col, indexCol) => {
    const colIndex = getRandomIndex(parsedBoardIndexes.col);
    //fazer array de 4 dimensoes no parsedboardindexeds
    col.forEach((_, indexRow) => {
      const rowIndex = getRandomIndex(parsedBoardIndexes.row);
      board[colIndex][rowIndex] = getDiffEmojis(board);
      console.log('colIndex:', colIndex)

    });
  });

  return (
    <div className="App">
      {board.map((col, i1) => (
        <div key={i1} className="flex ">
          {col.map((row, i2) => (
            <div
              key={i2}
              className=" flex items-center select-none justify-center w-10 h-10  bg-white/20 m-1 hover:scale-110 transition-all duration-150  hover:bg-blue-300 cursor-pointer"
            >
              {row}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
