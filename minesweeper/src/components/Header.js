import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';

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
          <div>
            <button
              className="left"
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
              ←
            </button>
          </div>
          <p className="right">Flags left: {flagsLeft}</p>
        </>
      ) : (
        <h3>
          {(!isGameActive && isWon && 'You won!') ||
            (!isGameActive && 'You lost :(')}
        </h3>
      )}
    </StyledHeader>
  );
}
