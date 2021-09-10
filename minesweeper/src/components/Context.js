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

  const [isGameActive, setIsGameActive] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [isInMenu, setIsInMenu] = useState(true);
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

        mines -= 1;
      }
    }
    return boardWithMines;
  };

  const countMinesAroundCell = (cellArr, x, y) => {
    let minesAround = 0;
    for (let dx = x - 1; dx <= x + 1; dx++) {
      for (let dy = y - 1; dy <= y + 1; dy++) {
        const cell = cellArr?.[dx]?.[dy];
        if (cell && !(dx === x && dy === y)) {
          minesAround = cellArr?.[dx]?.[dy]?.isMine
            ? minesAround + 1
            : minesAround;
        }
      }
    }
    return minesAround || null;
  };

  const setCellValues = (cellArr) => {
    cellArr.forEach((row, rowIndex) =>
      row.forEach((cell, cellIndex) => {
        if (cell.isMine) return;
        const minesAroundCell = countMinesAroundCell(
          cellArr,
          rowIndex,
          cellIndex
        );
        if (minesAroundCell) {
          cellArr[rowIndex][cellIndex] = {
            ...cellArr[rowIndex][cellIndex],
            value: minesAroundCell,
          };
        }
        return cellArr[rowIndex][cellIndex];
      })
    );
    return cellArr;
  };

  const resetGameSettings = (settings = defaultGameSettings) => {
    setGameSettings(settings);
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

  const openAdjacentCells = (cellArr, x, y, open) => {
    for (let dx = x - 1; dx <= x + 1; dx++) {
      for (let dy = y - 1; dy <= y + 1; dy++) {
        const cell = cellArr?.[dx]?.[dy];
        if (cell && !(dx === x && dy === y)) {
          open(cellArr, dx, dy);
        }
      }
    }
  };

  const openCell = (currentBoard, x, y) => {
    const cell = currentBoard?.[x]?.[y];
    if (!cell) return;
    if (cell.isOpen) return;
    if (cell.value) {
      cell.isOpen = true;
      return;
    }
    cell.isOpen = true;
    openAdjacentCells(currentBoard, x, y, openCell);
  };

  const showMines = (currentBoard) => {
    const boardWithOpenedMines = currentBoard.map((row) =>
      row.map((cell) => {
        if (cell.isMine) {
          cell.isOpen = true;
        }
        return cell;
      })
    );
    setBoard(boardWithOpenedMines);
  };

  useEffect(() => {
    const { boardSize, difficulty: difficultyLevel } = gameSettings;
    const boardWithMines = addMinesToBoard(
      boardSize,
      difficultyLevel,
      createInitialBoard(boardSize)
    );
    const calculatedBoard = setCellValues(boardWithMines);
    setBoard(calculatedBoard);
    setFlagsLeft(difficultyLevel);
  }, [gameSettings]);

  return (
    <Context.Provider
      value={{
        board,
        setBoard,
        openCell,
        isWon,
        setIsWon,
        isGameActive,
        isInMenu,
        setIsInMenu,
        setIsGameActive,
        gameSettings,
        flagsLeft,
        setFlagsLeft,
        placeFlagOnBoard,
        removeFlagOnBoard,
        handleSettingsChange,
        resetGameSettings,
        showMines,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
