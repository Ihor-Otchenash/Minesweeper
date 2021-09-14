import React, { useContext } from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';
import { Context } from './Context';

const StyledCell = styled.div`
  border-width: 1px;
  border-color: ${({ isMine, isFlag, isOpen }) =>
    (isMine && isOpen && '#EA3E6C') ||
    (isOpen && '#985C5C') ||
    (isFlag && '#35D3D0')};
  border-style: solid;
  border-radius: ${({ isMine, isOpen }) =>
    (isMine && isOpen && '50%') || '0.25rem'};
  margin: 0.375rem;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.5rem;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
  font-weight: 300;

  &::after {
    content: '';
    display: ${({ isFlag }) => (isFlag ? 'block' : 'none')};
    width: 0.5rem;
    height: 0.5rem;
    border: 1px solid #35d3d0;
    border-radius: 50%;
  }
`;

const handleClick = ({
  board,
  setBoard,
  isGameActive,
  setIsGameActive,
  openCell,
  removeFlagOnBoard,
  showMines,
  x,
  y,
}) => {
  if (!isGameActive) return;
  const { isFlag, isMine } = board[x][y];
  if (isMine) {
    setIsGameActive(false);
    showMines(board);
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
  { isGameActive, board, flagsLeft, removeFlagOnBoard, placeFlagOnBoard, x, y }
) => {
  e.preventDefault();
  if (!isGameActive) return;
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
    isGameActive,
    setBoard,
    setIsGameActive,
    flagsLeft,
    removeFlagOnBoard,
    placeFlagOnBoard,
    board,
    openCell,
    showMines,
  } = useContext(Context);

  const clickArgs = {
    isGameActive,
    board,
    setBoard,
    setIsGameActive,
    openCell,
    removeFlagOnBoard,
    showMines,
    x,
    y,
  };

  const rightClickArgs = {
    x,
    y,
    isGameActive,
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
      onClick={() => handleClick(clickArgs)}
      onContextMenu={(e) => handleRightClick(e, rightClickArgs)}
    >
      {cell.isOpen && cell.value ? cell.value : null}
    </StyledCell>
  );
}
