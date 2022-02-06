import React, { useEffect, useState } from "react";
import { generateSquares, getNullAdjacents } from "./utils";
import bombflagged from "./images/bombflagged.gif";
import bombrevealed from "./images/bombrevealed.gif";
import bombquestion from "./images/bombquestion.gif";
import blank from "./images/blank.gif";
const numbers = [];
for (let i = 0; i < 9; i++) numbers.push(require(`./images/open${i}.gif`));

const Grid = ({
  rows,
  cols,
  bombs,
  failure,
  stop,
  start,
  startGame,
  winGame,
  loseGame,
}) => {
  const [squares, setSquares] = useState([]);

  const handleClick =
    ({ isBomb, isClicked, index, isMarked, isProbably }) =>
    (e) => {
      if (failure) return;
      if (isMarked || isProbably) return;
      if (isBomb) loseGame();

      if (!start) startGame(true);

      if (!isClicked) {
        const newSquares = [...squares];
        if (newSquares[index].adjacents) newSquares[index].isClicked = true;
        else getNullAdjacents(newSquares, index, cols);
        setSquares(newSquares);

        const isFinished = newSquares.every(
          (square) =>
            (square.isClicked && !square.isBomb) ||
            (square.isBomb && !square.isClicked)
        );

        if (isFinished) winGame();
      }
    };

  const handleContextMenu = (square) => (e) => {
    e.preventDefault();
    if (failure) return;
    if (square.isClicked) return;

    if (!square.isMarked && !square.isProbably) {
      const newSquares = [...squares];
      newSquares[square.index].isMarked = true;
      setSquares(newSquares);
    } else if (square.isMarked && !square.isProbably) {
      const newSquares = [...squares];
      newSquares[square.index].isMarked = false;
      newSquares[square.index].isProbably = true;
      setSquares(newSquares);
    } else if (!square.isMarked && square.isProbably) {
      const newSquares = [...squares];
      newSquares[square.index].isMarked = false;
      newSquares[square.index].isProbably = false;
      setSquares(newSquares);
    }
  };

  const getImg = (square, failure) => {
    if (square.isBomb && failure) return <img src={bombrevealed} alt='bomb' />;

    if (square.isMarked) return <img src={bombflagged} alt='Marked' />;

    if (square.isProbably) return <img src={bombquestion} alt='bomb' />;

    if (!square.isClicked) return <img src={blank} alt='blank' />;
    else return <img src={numbers[square.adjacents]} alt={square.adjacents} />;
  };

  useEffect(() => {
    if (stop) setSquares(generateSquares(cols, rows, bombs));
  }, [stop, cols, rows]);

  return (
    <div className='flex mt-10'>
      <div
        className={`border border-gray-300 grid gap-0`}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {squares.map((square, i) => (
          <div
            key={i}
            className='flex text-sm items-center justify-center w-4 h-4 select-none'
            onClick={handleClick(square)}
            onContextMenu={handleContextMenu(square)}
          >
            {getImg(square, failure)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
