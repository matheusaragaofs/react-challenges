import { emojisLength, getEmoji } from "../emojis";

let newCurrEmoji = getEmoji()
export const getDiffEmojis = (board) => {
  const emojiOccurrency = getOccurencesOfEmoji(board?.flat(), newCurrEmoji);

  if (emojiOccurrency == 2) {
    newCurrEmoji = getEmoji();
    console.log('board?.flat():', board?.flat())
    if (board?.flat().includes(newCurrEmoji)) getDiffEmojis(board);

    return newCurrEmoji;
  }
  return newCurrEmoji;
};
export const getOccurencesOfEmoji = (array, emoji) =>
  array?.filter((el) => el == emoji)?.length;
