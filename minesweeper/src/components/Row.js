import React from 'react';
import styled from 'styled-components';
import Cell from './Cell';

const StyledRow = styled.div`
  display: flex;
  justify-content: center;
`;

export default function Row({ children }) {
  return <StyledRow>{children}</StyledRow>;
}
