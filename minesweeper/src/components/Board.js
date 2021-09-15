import React, { useContext } from 'react';
import Row from './Row';
import Cell from './Cell';
import StyledBoard from '../styles/StyledBoard';
import { Context } from './Context';

const designBoard = (board) =>
  board.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((cell, cellIndex) => (
        <Cell
          cell={cell}
          key={`${rowIndex}${cellIndex}`}
          x={rowIndex}
          y={cellIndex}
        />
      ))}
    </Row>
  ));

export default function Board() {
  const { board } = useContext(Context);
  const finalBoard = designBoard(board);
  return <StyledBoard>{finalBoard}</StyledBoard>;
}
