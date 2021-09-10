import React, { useContext } from 'react';

import { Context } from './Context';

const gameOptions = {
  boardSize: {
    Small: '8',
    Medium: '10',
    Big: '12',
  },
  difficulty: {
    Easy: '5',
    Moderate: '10',
    Hard: '15',
  },
};

const handleSubmit = (e, setIsGameActive) => {
  e.preventDefault();
  setIsGameActive(true);
};

export default function Menu() {
  const { gameSettings, handleSettingsChange, setIsGameActive } =
    useContext(Context);
  const { boardSize, difficulty } = gameSettings;
  return (
    <form onSubmit={(e) => handleSubmit(e, setIsGameActive)}>
      <label htmlFor="boardSize">
        Choose Board Size
        <select
          name="boardSize"
          id="boardSize"
          onChange={handleSettingsChange}
          value={boardSize}
        >
          {Object.entries(gameOptions.boardSize).map(
            ([sizeName, sizeValue]) => (
              <option key={sizeName} value={sizeValue}>
                {sizeName}
              </option>
            )
          )}
        </select>
      </label>
      <label htmlFor="difficulty">
        Choose Difficulty
        <select
          name="difficulty"
          id="difficulty"
          onChange={handleSettingsChange}
          value={difficulty}
        >
          {Object.entries(gameOptions.difficulty).map(
            ([difficultyName, difficultyValue]) => (
              <option key={difficultyName} value={difficultyValue}>
                {difficultyName}
              </option>
            )
          )}
        </select>
      </label>
      <button type="submit">New Game</button>
    </form>
  );
}
