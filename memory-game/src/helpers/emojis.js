import { emojisLength, getEmoji } from "../emojis";

let newCurrEmoji = getEmoji()
export const getDiffEmojis = ({ board, boardSize }) => {
  if (boardSize ** 2 > emojisLength) return;
  const emojiOccurrency = getOccurencesOfEmoji(board?.flat(), newCurrEmoji);

  if (emojiOccurrency == 2) {
    newCurrEmoji = getEmoji();
    if (board?.flat().includes(newCurrEmoji)) getDiffEmojis(board);

    return newCurrEmoji;
  }
  return newCurrEmoji;
};
export const getOccurencesOfEmoji = (array, emoji) =>
  array?.filter((el) => el == emoji)?.length;
