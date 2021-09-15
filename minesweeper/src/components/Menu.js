import React, { useContext } from 'react';
import StyledMenu from '../styles/StyledMenu';

import { Context } from './Context';

const handleSubmit = (e, setIsGameActive, setIsInMenu) => {
  e.preventDefault();
  setIsGameActive(true);
  setIsInMenu(false);
};

export default function Menu() {
  const {
    gameSettings,
    gameOptions,
    handleSettingsChange,
    setIsGameActive,
    setIsInMenu,
  } = useContext(Context);
  const { boardSize, difficulty } = gameSettings;
  return (
    <StyledMenu>
      <h1>Minesweeper</h1>
      <form onSubmit={(e) => handleSubmit(e, setIsGameActive, setIsInMenu)}>
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
    </StyledMenu>
  );
}
