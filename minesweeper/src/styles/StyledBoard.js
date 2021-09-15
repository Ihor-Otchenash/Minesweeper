import styled from 'styled-components';

const StyledBoard = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  min-height: calc(100vh - 8rem); /* 4rem Header + 4rem Footer*/
`;

export default StyledBoard;
