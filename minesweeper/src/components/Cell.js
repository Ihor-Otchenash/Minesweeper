import React, { useContext } from 'react';
import styled from 'styled-components';
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
  board,
  setIsGameOn,
  resetGameSettings,
  openCell,
  removeFlagOnBoard,
  x,
  y
) => {
  const { isFlag, isMine } = board[x][y];
  if (isMine) {
    setIsGameOn(false);
    resetGameSettings();
    return;
  }
  if (isFlag) {
    removeFlagOnBoard(x, y);
  }
  openCell(x, y);
};

const handleRightClick = (
  e,
  board,
  flagsLeft,
  removeFlagOnBoard,
  placeFlagOnBoard,
  x,
  y
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
    setIsGameOn,
    resetGameSettings,
    flagsLeft,
    removeFlagOnBoard,
    placeFlagOnBoard,
    board,
    openCell,
  } = useContext(Context);

  return (
    <StyledCell
      isMine={isMine}
      isFlag={isFlag}
      isOpen={isOpen}
      onClick={(e) =>
        handleClick(
          e,
          board,
          setIsGameOn,
          resetGameSettings,
          openCell,
          removeFlagOnBoard,
          x,
          y
        )
      }
      onContextMenu={(e) =>
        handleRightClick(
          e,
          board,
          flagsLeft,
          removeFlagOnBoard,
          placeFlagOnBoard,
          x,
          y
        )
      }
    >
      {cell.value}
    </StyledCell>
  );
}
