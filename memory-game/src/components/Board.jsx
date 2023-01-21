import React, { useEffect, useState } from "react";
import { boardSizes } from "../boardSizes";
import { getColsRows } from "../helpers/cols-rows";
import { getDiffEmojis } from "../helpers/emojis";

export const Board = ({ boardSize, sneakQtt }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [findedCards, setFindedCards] = useState([]);
  const [theBoard, settheBoard] = useState();
  const [disableBoard, setDisableBoard] = useState(false);
  const [disableSneakClick, setDisableSneakClick] = useState(false);
  const [sneak, setSneak] = useState(false);
  const [currentSneakQtt, setCurrentSneakQtt] = useState(sneakQtt);

  const [win, setWin] = useState(false);

  useEffect(() => {
    let board = new Array(boardSize).fill("").map((e, index) => {
      return new Array(boardSize).fill(1);
    });
    board?.forEach((col, indexCol) => {
      col?.forEach((_, indexRow) => {
        const { row, col } = getColsRows(pbi);
        board[row][col] = getDiffEmojis(board);
      });
    });
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

  const handleSneak = () => {
    setSneak(true);
    setDisableSneakClick(true);
    setCurrentSneakQtt(currentSneakQtt - 1);
    setTimeout(() => {
      setSneak(false);
      setDisableSneakClick(false);
    }, 5000);
  };
  return (
    <div>
      {(!!currentSneakQtt && !win) && (
        <div className="mb-4">
          you got {currentSneakQtt} of this
          <button
            className="ml-4 rounded-lg px-4 py-3 bg-white/20 shadow-lg hover:scale-110 transition-all"
            onClick={disableSneakClick ? () => {} : handleSneak}
          >
            sneak 👀 for 5 seconds
          </button>
        </div>
      )}
      {win && (
        <div className="bg-white/20 text-white rounded-lg p-2 mb-4 font-bold">
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
              className="relative rounded-md overflow-clip flex items-center select-none justify-center h-14 w-14   bg-white/20 m-1 hover:scale-110 transition-all duration-150  hover:bg-blue-300 cursor-pointer"
            >
              {!sneak &&
                !selectedCards.includes(`${row}-${i1}-${i2}`) &&
                !findedCards.includes(`${row}-${i1}-${i2}`) && (
                  <div className="bg-blue-100 rounded-md absolute h-full w-full" />
                )}
              {row}
            </div>
          ))}
        </div>
      ))}

      {win ? (
        <button
          className="mt-2 rounded-lg px-4 py-3 bg-white/40 shadow-lg hover:scale-110 transition-all"
          onClick={() => location.reload()}
        >
          Try again?
        </button>
      ) : (
        <button
          className="mt-16 mb-10 rounded-lg px-4 py-3 bg-white/40 shadow-lg hover:scale-110 transition-all"
          onClick={() => location.reload()}
        >
          Back
        </button>
      )}
    </div>
  );
};
