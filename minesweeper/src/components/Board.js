import React from 'react';
import styled from 'styled-components';
import Row from './Row';
import Cell from './Cell';

const BoardStyles = styled.ul`
  background-color: lightblue;
  font-size: 1rem;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const setMines = (size, board) => {
  const boardWithMines = [...board];
  // Size of the board 10x10 = 10 mines on the board
  let mines = size;

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

const buildBoard = (size) => {
  const emptyBoard = [];
  for (let i = 0; i < size; i++) {
    emptyBoard[i] = [];
    for (let j = 0; j < size; j++) {
      emptyBoard[i] = [...emptyBoard[i], 0];
    }
  }
  const boardWithMines = setMines(size, emptyBoard);

  return boardWithMines.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((cell, cellIndex) => (
        <Cell cell={cell} index={`${rowIndex}${cellIndex}`} />
      ))}
    </Row>
  ));
};

export default function Board() {
  return <BoardStyles>{buildBoard(10)}</BoardStyles>;
}
