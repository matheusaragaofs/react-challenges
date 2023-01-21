import React, { useEffect, useState } from "react";
import { boardSizes } from "../boardSizes";
import { getColsRows } from "../helpers/cols-rows";
import { getDiffEmojis } from "../helpers/emojis";

export const Board = ({ boardSize }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [findedCards, setFindedCards] = useState([]);
  const [theBoard, settheBoard] = useState();
  const [disableBoard, setDisableBoard] = useState(false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    let board = new Array(boardSize).fill("").map((e, index) => {
      return new Array(boardSize).fill(1);
    });

    if (board) {
      board?.forEach((col, indexCol) => {
        col?.forEach((_, indexRow) => {
          const { row, col } = getColsRows(pbi);
          board[row][col] = getDiffEmojis({ board, boardSize });
        });
      });
    }

    settheBoard(board);
  }, []);

  useEffect(() => {
    if (findedCards.length == boardSize * boardSize) {
      setWin(true);
    }
  }, [findedCards]);

  const handleSelectedCards = (currentCard) => {
    if (selectedCards[0] == currentCard) return;
    if (selectedCards.length) {
      const [uniqueEmojiCard] = selectedCards;
      if (uniqueEmojiCard !== currentCard) {
        const [emoji1] = uniqueEmojiCard.split("-");
        const [emoji2] = currentCard.split("-");
        if (emoji1 !== emoji2) {
          setDisableBoard(true);
          setSelectedCards([...selectedCards, currentCard]);
          setTimeout(() => {
            setSelectedCards([]);
            setDisableBoard(false);
          }, 1000);
          return;
        } else {
          setFindedCards([...findedCards, uniqueEmojiCard, currentCard]);

          return setSelectedCards([]);
        }
      }
    }
    setSelectedCards([...selectedCards, currentCard]);
  };
  const pbi = boardSizes[boardSize];
  return (
    <div >
      {win && (
        <div className="bg-white text-black rounded-lg p-2 font-bold -translate-y-4">
          Congrats! You won! 🤩🥳🎉
        </div>
      )}
      {theBoard?.map((col, i1) => (
        <div key={i1} className="flex justify-center border-1 ">
          {col.map((row, i2) => (
            <div
              onClick={() =>
                disableBoard
                  ? () => {}
                  : handleSelectedCards(`${row}-${i1}-${i2}`)
              }
              key={i2}
              className="relative overflow-clip flex items-center select-none justify-center h-14 w-14   bg-white/20 m-1 hover:scale-110 transition-all duration-150  hover:bg-blue-300 cursor-pointer"
            >
              {!selectedCards.includes(`${row}-${i1}-${i2}`) &&
                !findedCards.includes(`${row}-${i1}-${i2}`) && (
                  <div className="bg-cyan-500/10 absolute h-full w-full" />
                )}
              {row}
            </div>
          ))}
        </div>
      ))}

      {win ? <button className="mt-2" onClick={() => location.reload()}>Try again?</button> : <button className="translate-y-28 mb-10" onClick={() => location.reload()}>Back</button>}
    </div>
  );
};
