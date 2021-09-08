import React, { useContext } from 'react';
import styled from 'styled-components';
import Row from './Row';
import Cell from './Cell';

import { Context } from './Context';

const BoardStyles = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const designBoard = (board) =>
  board.map((row, rowIndex) => (
    <Row key={rowIndex}>
      {row.map((cell, cellIndex) => {
        console.log(cell);
        return (
          <Cell
            cell={cell}
            key={`${rowIndex}${cellIndex}`}
            x={rowIndex}
            y={cellIndex}
          />
        );
      })}
    </Row>
  ));

export default function Board() {
  const { board } = useContext(Context);
  const finalBoard = designBoard(board);
  return <BoardStyles>{finalBoard}</BoardStyles>;
}
