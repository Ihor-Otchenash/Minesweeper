import React from 'react';
import styled from 'styled-components';

const StyledCell = styled.div`
  border: 1px solid grey;
  background-color: white;
  width: 25px;
  height: 25px;
`;

const handleClick = (e, isMine) => {
  if (isMine) console.log('Game over');
};

const handleRightClick = (e) => {
  e.preventDefault();
  console.log('Put flag');
};

export default function Cell({ cell, index }) {
  const isMine = Boolean(cell);

  return (
    <StyledCell
      key={index}
      isMine={isMine}
      onClick={(e) => handleClick(e, isMine)}
      onContextMenu={handleRightClick}
    />
  );
}
