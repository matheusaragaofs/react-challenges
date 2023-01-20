import React from "react";
import { boardSizes } from "../boardSizes";
import { getColsRows } from "../helpers/cols-rows";
import { getDiffEmojis } from "../helpers/emojis";
export const Board = ({ boardSize }) => {
  let board = new Array(boardSize).fill("").map((e, index) => {
    return new Array(boardSize).fill(1);
  });

  const pbi = boardSizes[boardSize];
  board.forEach((col, indexCol) => {
    col.forEach((_, indexRow) => {
      const { row, col } = getColsRows(pbi);
      board[row][col] = getDiffEmojis({ board, boardSize });
    });
  });

  return (
    <div className="App">
      {board?.map((col, i1) => (
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
};
