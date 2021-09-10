import React, { useContext } from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { Context } from './Context';

const StyledCell = styled.div`
  border: 1px solid grey;
  background-color: ${({ isMine, isFlag, isOpen }) =>
    (isOpen && 'lightgray') ||
    (isFlag && 'green') ||
    (isMine && 'palevioletred') ||
    'white'}; /* Changed logic here, mines will hidden */
  width: 25px;
  height: 25px;
`;

const handleClick = (
  e,
  {
    board,
    setBoard,
    setIsGameActive,
    resetGameSettings,
    openCell,
    removeFlagOnBoard,
    x,
    y,
  }
) => {
  const { isFlag, isMine } = board[x][y];
  if (isMine) {
    setIsGameActive(false);
    resetGameSettings();
    return;
  }
  if (isFlag) {
    removeFlagOnBoard(x, y);
  }
  const boardCopy = cloneDeep(board);
  openCell(boardCopy, x, y);
  setBoard(boardCopy);
};

const handleRightClick = (
  e,
  { board, flagsLeft, removeFlagOnBoard, placeFlagOnBoard, x, y }
) => {
  e.preventDefault();
  const { isFlag, isOpen } = board[x][y];
  if (isFlag) {
    removeFlagOnBoard(x, y);
    return;
  }
  if (flagsLeft - 1 >= 0 && !isOpen) {
    placeFlagOnBoard(x, y);
  }
};

export default function Cell({ cell, x, y }) {
  const { isMine, isFlag, isOpen } = cell;
  const {
    setBoard,
    setIsGameActive,
    resetGameSettings,
    flagsLeft,
    removeFlagOnBoard,
    placeFlagOnBoard,
    board,
    openCell,
  } = useContext(Context);

  const clickArgs = {
    board,
    setBoard,
    setIsGameActive,
    resetGameSettings,
    openCell,
    removeFlagOnBoard,
    x,
    y,
  };

  const rightClickArgs = {
    x,
    y,
    board,
    flagsLeft,
    removeFlagOnBoard,
    placeFlagOnBoard,
  };

  return (
    <StyledCell
      isMine={isMine}
      isFlag={isFlag}
      isOpen={isOpen}
      onClick={(e) => handleClick(e, clickArgs)}
      onContextMenu={(e) => handleRightClick(e, rightClickArgs)}
    >
      {cell.isOpen && cell.value ? cell.value : null}
    </StyledCell>
  );
}
