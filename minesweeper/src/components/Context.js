import React, { useState, createContext, useEffect } from 'react';
import useSettings from '../helpers/useSettings';

const Context = createContext();

function ContextProvider({ children }) {
  const testingBoard = [
    [
      { isFlag: false, isMine: true, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
    ],
    [
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
    ],
    [
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
    ],
    [
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: true, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
    ],
    [
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: true, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
    ],
    [
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: false, isOpen: false, value: null },
      { isFlag: false, isMine: true, isOpen: false, value: null },
      { isFlag: false, isMine: true, isOpen: false, value: null },
    ],
  ];
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
        emptyBoard[i] = [
          ...emptyBoard[i],
          { isMine: false, isFlag: false, isOpen: false },
        ];
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

      if (!boardWithMines[rowIndex][cellIndex].isMine) {
        boardWithMines[rowIndex][cellIndex] = {
          ...boardWithMines[rowIndex][cellIndex],
          isMine: true,
        };
        console.log(boardWithMines[rowIndex][cellIndex]);
        mines -= 1;
      }
    }
    return boardWithMines;
  };

  const resetGameSettings = () => {
    setGameSettings(defaultGameSettings);
  };

  const placeFlagOnBoard = (x, y) => {
    setFlagsLeft((prevState) => prevState - 1);
    setBoard((prevBoard) => {
      const modifiedBoard = [...prevBoard];
      modifiedBoard[x][y] = { ...modifiedBoard[x][y], isFlag: true };
      return modifiedBoard;
    });
  };

  const removeFlagOnBoard = (x, y) => {
    setFlagsLeft((prevState) => prevState + 1);
    setBoard((prevBoard) => {
      const modifiedBoard = [...prevBoard];
      modifiedBoard[x][y] = { ...modifiedBoard[x][y], isFlag: false };
      return modifiedBoard;
    });
  };

  const openCell = (x, y) => {
    setBoard((prevBoard) => {
      const modifiedBoard = [...prevBoard];
      modifiedBoard[x][y] = { ...modifiedBoard[x][y], isOpen: true };
      return modifiedBoard;
    });
  };

  useEffect(() => {
    const { boardSize, difficulty: difficultyLevel } = gameSettings;
    const boardWithMines = addMinesToBoard(
      boardSize,
      difficultyLevel,
      createInitialBoard(boardSize)
    );
    // setBoard(boardWithMines);
    setBoard(testingBoard);
    setFlagsLeft(difficultyLevel);
  }, [gameSettings]);

  return (
    <Context.Provider
      value={{
        board,
        setBoard,
        openCell,
        isGameOn,
        setIsGameOn,
        gameSettings,
        flagsLeft,
        setFlagsLeft,
        placeFlagOnBoard,
        removeFlagOnBoard,
        handleSettingsChange,
        resetGameSettings,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
