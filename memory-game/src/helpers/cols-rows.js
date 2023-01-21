
const getRandomIndex = (boardIndexes) =>
  Math.floor(Math.random() * boardIndexes.length);


export const getColsRows = (pbi) => {
  const index = getRandomIndex(pbi);

  if (!pbi[index]) {
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
