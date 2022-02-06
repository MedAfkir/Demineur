export const setSquareObj = (index, isBomb = false) => {
  return {
    index,
    isBomb,
    adjacents: 0,
    isMarked: false,
    isProbably: false,
    isClicked: false,
  };
};

/**
 *
 * @param {object[]} squares
 * @param {number} cols
 * @param {number} rows
 * @returns {number[]}
 */
export const getAdjacents = (squares = [], cols = 0) => {
  let adjacents = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].isBomb) {
      adjacents.push(0);
      continue;
    }

    const hasTopAdjacent = i >= cols; // top-adjacent
    const hasRightAdjacent = i % cols != cols - 1; // right-adjacent
    const hasBotAdjacent = i < squares.length - cols; // bottom-adjacent
    const hasLeftAdjacent = i % cols != 0; // left-adjacent

    const count = 0;

    count += hasTopAdjacent ? (squares[i - cols]?.isBomb ? 1 : 0) : 0;
    count += hasRightAdjacent ? (squares[i + 1]?.isBomb ? 1 : 0) : 0;
    count += hasLeftAdjacent ? (squares[i - 1]?.isBomb ? 1 : 0) : 0;
    count += hasBotAdjacent ? (squares[i + cols]?.isBomb ? 1 : 0) : 0;

    count +=
      hasTopAdjacent && hasRightAdjacent
        ? squares[i + 1 - cols]?.isBomb
          ? 1
          : 0
        : 0;
    count +=
      hasBotAdjacent && hasRightAdjacent
        ? squares[i + 1 + cols]?.isBomb
          ? 1
          : 0
        : 0;
    count +=
      hasBotAdjacent && hasLeftAdjacent
        ? squares[i - 1 + cols]?.isBomb
          ? 1
          : 0
        : 0;
    count +=
      hasTopAdjacent && hasLeftAdjacent
        ? squares[i - 1 - cols]?.isBomb
          ? 1
          : 0
        : 0;

    adjacents.push(count);
  }

  return adjacents;
};

export const generateDefaultSquares = (cols = 0, rows = 0) => {
  let squares = [];
  for (let i = 0; i < cols * rows; i++) squares.push(setSquareObj(i, false));
  return squares;
};

export const generateSquares = (cols = 0, rows = 0, bombs = 0) => {
  let squares = generateDefaultSquares(cols, rows);

  // Determinate the bombs
  for (let i = 0; i < bombs; i++) {
    let index;
    do {
      index = Math.floor(Math.random() * cols * rows);
    } while (
      squares.findIndex((element) => element.index == index && element.isBomb) >
      -1
    );
    squares[index].isBomb = true;
  }

  const adjacents = getAdjacents(squares, cols);
  for (let i = 0; i < squares.length; i++) squares[i].adjacents = adjacents[i];

  return squares;
};

export const setLevel = (id, label, cols, rows, bombs) => {
  return {
    id,
    label,
    cols,
    rows,
    bombs,
  };
};

export const formatTime = (time = 0) => {
  return `${
    Math.floor(time / 60) > 9
      ? Math.floor(time / 60)
      : `0${Math.floor(time / 60)}`
  }:${time % 60 > 9 ? time : `0${time % 60}`}`;
};

export const getNullAdjacents = (squares, index, cols, done = []) => {
  if (done.includes(index)) return squares;

  if (squares[index].adjacents != 0) {
    squares[index].isClicked = true;
    return squares;
  }

  squares[index].isClicked = true;
  done = [...done, index];

  const hasTopAdjacent = index >= cols; // top-adjacent
  const hasRightAdjacent = index % cols != cols - 1; // right-adjacent
  const hasBotAdjacent = index < squares.length - cols; // bottom-adjacent
  const hasLeftAdjacent = index % cols != 0; // left-adjacent

  if (hasBotAdjacent)
    squares = getNullAdjacents(squares, index + cols, cols, done);
  if (hasTopAdjacent)
    squares = getNullAdjacents(squares, index - cols, cols, done);
  if (hasRightAdjacent)
    squares = getNullAdjacents(squares, index + 1, cols, done);
  if (hasLeftAdjacent)
    squares = getNullAdjacents(squares, index - 1, cols, done);

  if (hasTopAdjacent && hasRightAdjacent)
    squares = getNullAdjacents(squares, index - cols + 1, cols, done);
  if (hasBotAdjacent && hasRightAdjacent)
    squares = getNullAdjacents(squares, index + cols + 1, cols, done);
  if (hasBotAdjacent && hasLeftAdjacent)
    squares = getNullAdjacents(squares, index + cols - 1, cols, done);
  if (hasTopAdjacent && hasLeftAdjacent)
    squares = getNullAdjacents(squares, index - 1 - cols, cols, done);

  return squares;
};
