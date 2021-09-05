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
  if (isMine) {
    setIsGameOn(false);
    resetGameSettings();
  }
};

const handleRightClick = (e) => {
  e.preventDefault();
  e.target.style.backgroundColor = 'green';
};

export default function Cell({ cell, position }) {
  const isMine = Boolean(cell);
  const { setIsGameOn, resetGameSettings } = useContext(Context);

  return (
    <StyledCell
      position={position}
      isMine={isMine}
      onClick={(e) => handleClick(e, isMine, setIsGameOn, resetGameSettings)}
      onContextMenu={handleRightClick}
    />
  );
}
