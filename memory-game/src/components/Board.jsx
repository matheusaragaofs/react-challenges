import React, { useEffect, useState } from "react";
import { boardSizes } from "../boardSizes";
import { getColsRows } from "../helpers/cols-rows";
import { getDiffEmojis } from "../helpers/emojis";

export const Board = ({ boardSize }) => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [theBoard, settheBoard] = useState();

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
  const handleSelectedCards = (emoji) => {
    if (!emoji && selectedCards[0] == selectedCards[1]) return

    const [currentEmoji, index1CurrEmoji, index2CurrEmoji] = emoji.split("-");
    const coordCurrentEmoji = `${index1CurrEmoji}-${index2CurrEmoji}`
    
    const repeatedEmoji =  selectedCards.find((card) => {
      const [findEmoji, index1FindEmoji, index2FindEmoji] = card.split("-");
      const coordFindEmoji = `${index1FindEmoji}-${index2FindEmoji}`
      return ((findEmoji == currentEmoji) && (coordCurrentEmoji !== coordFindEmoji) )
    });
    console.log('repeatedEmoji:', repeatedEmoji)

    if (selectedCards.length == 2) {
      console.log("selectedCards 1:", selectedCards);
      return setSelectedCards([]);
    }
    setSelectedCards([...selectedCards, emoji]);
    if (repeatedEmoji) return (alert('achou!!'))  
    console.log("selectedCards: 2", selectedCards);
  };
  const pbi = boardSizes[boardSize];
  return (
    <div className="App">
      {theBoard?.map((col, i1) => (
        <div key={i1} className="flex ">
          {col.map((row, i2) => (
            <div
              onClick={() => handleSelectedCards(`${row}-${i1}-${i2}`)}
              key={i2}
              className="relative overflow-clip flex items-center select-none justify-center w-10 h-10  bg-white/20 m-1 hover:scale-110 transition-all duration-150  hover:bg-blue-300 cursor-pointer"
            >
              {!selectedCards.includes(`${row}-${i1}-${i2}`) && (
                <div className="bg-red-400 absolute h-full w-full" />
              )}
              {row}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
