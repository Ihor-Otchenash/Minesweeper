import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: ${({ isGameActive }) =>
    isGameActive ? 'space-between' : 'center'};
`;

const handleClick = (
  setIsGameActive,
  setIsInMenu,
  gameSettings,
  resetGameSettings
) => {
  setIsGameActive(false);
  setIsInMenu(true);
  const sameGameSettings = { ...gameSettings };
  resetGameSettings(sameGameSettings);
};

export default function Header() {
  const {
    isGameActive,
    isWon,
    gameSettings,
    setIsGameActive,
    flagsLeft,
    resetGameSettings,
    setIsInMenu,
  } = useContext(Context);
  return (
    <StyledHeader isGameActive={isGameActive}>
      {isGameActive ? (
        <>
          <button
            type="button"
            onClick={() =>
              handleClick(
                setIsGameActive,
                setIsInMenu,
                gameSettings,
                resetGameSettings
              )
            }
          >
            Back
          </button>
          <p>Flags left: {flagsLeft}</p>
        </>
      ) : (
        <h3>
          {(!isGameActive && isWon && 'You won!') ||
            (!isGameActive && 'You lost')}
        </h3>
      )}
    </StyledHeader>
  );
}
