import React, { useState, createContext, useEffect } from 'react';
import useSettings from '../helpers/useSettings';

const Context = createContext();

function ContextProvider({ children }) {
  const [board, setBoard] = useState([]);

  const defaultGameSettings = {
    boardSize: 10,
    difficulty: 10,
  };

  const { gameSettings, setGameSettings, handleSettingsChange } =
    useSettings(defaultGameSettings);
  const { difficulty } = gameSettings;

  const [isGameOn, setIsGameOn] = useState(false);
  const [flagsLeft, setFlagsLeft] = useState(difficulty);

  const createInitialBoard = (size) => {
    const emptyBoard = [];
    for (let i = 0; i < size; i++) {
      emptyBoard[i] = [];
      for (let j = 0; j < size; j++) {
        emptyBoard[i] = [...emptyBoard[i], 0];
      }
    }
    return emptyBoard;
  };

  const addMinesToBoard = (size, difficultyLevel, emptyBoard) => {
    const boardWithMines = emptyBoard;
    // Size of the board 10x10 = 10 mines on the board
    let mines = difficultyLevel;

    // Place mines
    while (mines) {
      const rowIndex = Math.round(Math.random() * (size - 1));
      const cellIndex = Math.round(Math.random() * (size - 1));

      if (!boardWithMines[rowIndex][cellIndex]) {
        boardWithMines[rowIndex][cellIndex] = 1;
        mines -= 1;
      }
    }

    return boardWithMines;
  };

  const resetGameSettings = () => {
    setGameSettings(defaultGameSettings);
  };

  useEffect(() => {
    const { boardSize, difficulty: diffLevel } = gameSettings;
    const boardWithMines = addMinesToBoard(
      boardSize,
      diffLevel,
      createInitialBoard(boardSize)
    );
    setBoard(boardWithMines);
  }, [gameSettings]);

  return (
    <Context.Provider
      value={{
        board,
        setBoard,
        isGameOn,
        setIsGameOn,
        gameSettings,
        flagsLeft,
        setFlagsLeft,
        handleSettingsChange,
        resetGameSettings,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
