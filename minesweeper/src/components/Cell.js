import React, { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';

const StyledCell = styled.div`
  border: 1px solid grey;
  background-color: ${({ isMine }) => (isMine ? 'palevioletred' : 'white')};
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

const handleRightClick = (e, setFlagsLeft, setBoard, position) => {
  e.preventDefault();
  const [x, y] = position.split(',');
  setFlagsLeft((prevState) => {
    if (prevState - 1 >= 0) {
      e.target.style.backgroundColor = 'green';
      setBoard((prevBoard) => {
        const current = [...prevBoard];
        // STOPPED HERE, CHANGE LOGIC AND STRUCTURE OF THE CELL -> OBJ
        current[x][y] = 1;
        return current;
      });
      return prevState - 1;
    }
    return prevState;
  });
};

export default function Cell({ cell, position }) {
  const isMine = Boolean(cell);
  const { setIsGameOn, resetGameSettings, setFlagsLeft, setBoard } =
    useContext(Context);

  return (
    <StyledCell
      position={position}
      isMine={isMine}
      onClick={(e) => handleClick(e, isMine, setIsGameOn, resetGameSettings)}
      onContextMenu={(e) =>
        handleRightClick(e, setFlagsLeft, setBoard, position)
      }
    />
  );
}
