import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSettings from '../helpers/useSettings';

const Context = createContext();

function ContextProvider({ children }) {
  const gameOptions = {
    boardSize: {
      Small: '10',
      Medium: '14',
      Big: '18',
    },
    difficulty: {
      Easy: '10',
      Moderate: '20',
      Hard: '40',
    },
  };

  // Default settings are usually Medium size / Medium difficulty
  const defaultGameSettings = {
    boardSize: gameOptions.boardSize.Medium,
    difficulty: gameOptions.difficulty.Moderate,
  };

  // Gets the current game settings, grabs state change methods
  const { gameSettings, setGameSettings, handleSettingsChange } =
    useSettings(defaultGameSettings);
  const { boardSize, difficulty } = gameSettings;
  const totalCellsAmount = boardSize * boardSize - difficulty;

  // Defining required app states
  const [board, setBoard] = useState([]);
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

  // This function calculates the amount of mines around
  // Sets the corresponding amount to cell value
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

  // Reset gameSettings to custom settings or default ones
  const resetGameSettings = (settings = defaultGameSettings) => {
    setGameSettings(settings);
    setIsWon(false);
  };

  const placeFlagOnBoard = (x, y) => {
    setBoard((prevBoard) => {
      const modifiedBoard = [...prevBoard];
      modifiedBoard[x][y] = { ...modifiedBoard[x][y], isFlag: true };
      return modifiedBoard;
    });
  };

  const removeFlagOnBoard = (x, y) => {
    setBoard((prevBoard) => {
      const modifiedBoard = [...prevBoard];
      modifiedBoard[x][y] = { ...modifiedBoard[x][y], isFlag: false };
      return modifiedBoard;
    });
  };

  const calculateFlagsLeft = (currentBoard) => {
    const count = currentBoard.reduce(
      (outterAcc, row) =>
        outterAcc +
        row.reduce(
          (innerAcc, cell) => (cell.isFlag ? innerAcc + 1 : innerAcc),
          0
        ),
      0
    );
    setFlagsLeft(difficulty - count);
  };

  // Opens all the cells around currenly opened cell
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

  // Removes flag mark from cell in a naive way
  const unflagCell = (cell) => {
    if (cell.isFlag) {
      cell.isFlag = false;
    }
  };

  const openCell = (currentBoard, x, y) => {
    const cell = currentBoard?.[x]?.[y];
    if (!cell) return;
    if (cell.isOpen) return;
    if (cell.value) {
      cell.isOpen = true;
      unflagCell(cell);
      return;
    }
    cell.isOpen = true;
    unflagCell(cell);
    openAdjacentCells(currentBoard, x, y, openCell);
  };

  // Opens all the mines on board
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

  const markMinesAsFlag = (currentBoard) => {
    const boardFlagsInsteadOfMines = currentBoard.map((row) =>
      row.map((cell) => {
        if (cell.isMine) {
          cell.isFlag = true;
        }
        return cell;
      })
    );
    setBoard(boardFlagsInsteadOfMines);
  };

  const checkIfWon = (currentBoard, totalAmountOfCells, win, setGameActive) => {
    // If better performance is needed -> implement a counter in state
    // and increment / decrement it here instead of this loop
    const currentlyOpenedCellsAmount = currentBoard.reduce(
      (outterAcc, row) =>
        outterAcc +
        row.reduce(
          (innerAcc, cell) =>
            cell.isOpen && !cell.isMine ? innerAcc + 1 : innerAcc,
          0
        ),
      0
    );

    if (currentlyOpenedCellsAmount === totalAmountOfCells) {
      win(true);
      setGameActive(false);
    }
  };

  // As soon as the board was changed (cell opened etc)
  // Check how many flags left and the status of the game
  useEffect(() => {
    calculateFlagsLeft(board);
    checkIfWon(board, totalCellsAmount, setIsWon, setIsGameActive);
  }, [board]);

  // If won a game -> show where mines were
  useEffect(() => {
    markMinesAsFlag(board);
  }, [isWon]);

  // Create a new board when gameSettings are changed
  useEffect(() => {
    const boardWithMines = addMinesToBoard(
      boardSize,
      difficulty,
      createInitialBoard(boardSize)
    );
    const calculatedBoard = setCellValues(boardWithMines);
    setBoard(calculatedBoard);
    setFlagsLeft(difficulty);
  }, [gameSettings]);

  return (
    <Context.Provider
      value={{
        board,
        setBoard,
        gameOptions,
        openCell,
        isWon,
        setIsWon,
        isGameActive,
        isInMenu,
        setIsInMenu,
        setIsGameActive,
        gameSettings,
        flagsLeft,
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

ContextProvider.propTypes = {
  children: PropTypes.object,
};
