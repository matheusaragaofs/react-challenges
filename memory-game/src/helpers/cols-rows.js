import { getBoardIndexes } from "../boardIndexes";

const getRandomIndex = (boardIndexes) =>
  Math.floor(Math.random() * boardIndexes.length);

console.log('getBoardIndexes(8):', getBoardIndexes(9))

export const getColsRows = (pbi) => {
  const index = getRandomIndex(pbi);

  if (!pbi[index]) {
    console.log("1111111111");
    return getColsRows(pbi);
  }
  const [col, rows] = pbi[index];

  if (!rows.length) {
    delete pbi[index];
    return getColsRows(pbi);
  }

  const [randowRow] = rows.splice(getRandomIndex(rows), 1);
  return {
    col: Number(col),
    row: randowRow,
  };
};
