import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';

const StyledCell = styled.div`
  border: 1px solid grey;
  background-color: ${({ isMine, isFlag }) =>
    isMine
      ? 'palevioletred'
      : isFlag
      ? 'green'
      : 'white'}; /* Changed logic here, mines will hidden */
  width: 25px;
  height: 25px;
`;

const handleClick = (e, isMine, setIsGameOn, resetGameSettings) => {
  console.log('Clicked handled?');
  if (isMine) {
    setIsGameOn(false);
    resetGameSettings();
  }
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
  const { isFlag } = board[x][y];
  if (isFlag) {
    removeFlagOnBoard(x, y);
    return;
  }
  if (flagsLeft - 1 >= 0) {
    placeFlagOnBoard(x, y);
  }
};

export default function Cell({ cell, x, y }) {
  const { isMine, isFlag } = cell;
  const {
    setIsGameOn,
    resetGameSettings,
    flagsLeft,
    removeFlagOnBoard,
    placeFlagOnBoard,
    board,
  } = useContext(Context);

  return (
    <StyledCell
      isMine={isMine}
      isFlag={isFlag}
      onClick={(e) => handleClick(e, isMine, setIsGameOn, resetGameSettings)}
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
    />
  );
}
