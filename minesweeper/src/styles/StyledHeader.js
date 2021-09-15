import styled from 'styled-components';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ isGameActive }) =>
    isGameActive ? 'space-between' : 'center'};
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.8);
  height: 4rem;
  padding: 1rem;

  button {
    display: block;
    font-size: 1.75rem;
    cursor: pointer;
    border: none;
    color: #ffffff;
    outline: none;
    background: none;
  }
`;

export default StyledHeader;
