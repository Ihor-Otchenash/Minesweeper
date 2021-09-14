import React, { useContext } from 'react';
import styled from 'styled-components';
import Row from './Row';
import Cell from './Cell';

import { Context } from './Context';

const BoardStyles = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  min-height: calc(100vh - 8rem); /* 4rem Header + 4rem Footer*/
`;

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
  return <BoardStyles>{finalBoard}</BoardStyles>;
}
