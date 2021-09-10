import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export default function Header() {
  const { setIsGameActive, flagsLeft, resetGameSettings } = useContext(Context);
  return (
    <StyledHeader>
      <button
        type="submit"
        onClick={() => {
          setIsGameActive(false);
          resetGameSettings();
        }}
      >
        Back
      </button>
      <p>Flags left: {flagsLeft}</p>
    </StyledHeader>
  );
}
