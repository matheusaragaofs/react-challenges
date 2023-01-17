import "./App.css";
import { getEmoji, emojisLength } from "./emojis";

function App() {
  const lengthArray = 2;
  let board = new Array(lengthArray).fill("").map((e, index) => {
    return new Array(lengthArray).fill(1);
  });

  const getDiffEmojis = (board) => {
    if (lengthArray ** 2 > emojisLength) return;
    const emoji = getEmoji();
    const emojiOccurrency = getOccurencesOfEmoji(board.flat(), emoji);
    console.log('emojiOccurrency:', emojiOccurrency)
    if (emojiOccurrency == 2) {
      return getDiffEmojis(board);
    }
    return emoji;
  };
  const getOccurencesOfEmoji = (array, emoji) =>
    array.filter((el) => el == emoji).length;
  board.forEach((col, indexCol) => {
    col.forEach((_, indexRow) => {
      const emoji = getDiffEmojis(board);
      board[indexCol][indexRow] = emoji;
    });
  });

  return (
    <div className="">
      {board.map((col) => (
        <div className="flex ">
          {col.map((row) => (
            <div className=" flex items-center select-none justify-center w-10 h-10 bg-gradient-to-tr bg-white/20 m-1 hover:scale-110 transition-all duration-150 bg-green-600 hover:bg-blue-300 cursor-pointer">
              {row}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
