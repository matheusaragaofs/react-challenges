export const getBoardIndexes = (lengthArray) => {
  let boardIdexes = [];
  for (let x = 0; x < lengthArray; x++) boardIdexes.push(x);
  let allBoardIndexes = {};

  for (let x = 0; x < lengthArray; x++) allBoardIndexes[x] = boardIdexes;
  return Object.entries(allBoardIndexes);
};
