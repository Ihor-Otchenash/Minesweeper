import React, { useContext } from 'react';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { Context } from './Context';
import StyledCell from '../styles/StyledCell';

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

Cell.propTypes = {
  cell: PropTypes.object,
  x: PropTypes.number,
  y: PropTypes.number,
};
