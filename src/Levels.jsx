import React from "react";
import { levels } from "./constants";

const Levels = ({ selectedLevel, changeLevel }) => {
  const handleClick = (l) => (e) => {
    changeLevel(l);
  };

  return (
    <div className='mt-10 border rounded border-gray-300 p-5 flex justify-between items-center'>
      <p className='mr-10'>Levels:</p>
      <div>
        {levels.map((l, i) => (
          <button
            key={i}
            className={`ml-5 py-1 px-3 border border-gray-300 rounded text-sm outline-0 hover:bg-blue-700 hover:border-blue-700 hover:text-white focus:ring-2 focus:ring-blue-300 focus:ring-offset-0 ${
              selectedLevel.id == l.id ? "active" : ""
            }`}
            onClick={handleClick(l)}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Levels;
