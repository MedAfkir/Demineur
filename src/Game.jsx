import { useReducer, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import Counter from "./Counter";
import Grid from "./Grid";
import Levels from "./Levels";
import { levels } from "./constants";
import Modal from "./Modal";

const Game = () => {
  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(true);
  const [won, setWon] = useState(false);
  const [failure, setFailure] = useState(false);
  const [level, setLevel] = useLocalStorage("level", levels[0]);
  const [history, setHistory] = useLocalStorage("games", []);

  const startGame = () => {
    setStart(true);
    setStop(false);
    setFailure(false);
  };

  const winGame = () => {
    setStart(false);
    setWon(true);
  };

  const loseGame = () => {
    setFailure(true);
    setStart(false);
  };

  const resetGame = () => {
    setStart(false);
    setFailure(false);
    setWon(false);
    setStop(true);
  };

  const changeLevel = (level) => {
    setLevel(level);
    resetGame();
  };

  const addToHistory = (time) => {
    if (won) setHistory((h) => [...h, time]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <>
      <Levels selectedLevel={level} changeLevel={changeLevel} />
      <br />
      <div className='rounded border border-gray-300 p-4 flex flex-col items-center'>
        <div className='w-full flex items-center justify-between'>
          <div>{level.bombs}</div>
          <button
            onClick={() => resetGame()}
            className='py-1 px-3 border border-gray-300 rounded text-sm  outline-0 hover:bg-blue-700 hover:border-blue-700 hover:text-white focus:ring-2 focus:ring-blue-300 focus:ring-offset-0'
          >
            reset
          </button>
          <Counter start={start} stop={stop} addToHistory={addToHistory} />
        </div>
        <Grid
          cols={level.cols}
          rows={level.rows}
          bombs={level.bombs}
          start={start}
          stop={stop}
          failure={failure}
          startGame={startGame}
          resetGame={resetGame}
          loseGame={loseGame}
          winGame={winGame}
        />
        <Modal won={won} resetGame={resetGame} />
      </div>
    </>
  );
};

export default Game;
