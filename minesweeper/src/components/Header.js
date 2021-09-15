import { useContext } from 'react';
import { Context } from './Context';
import StyledHeader from '../styles/StyledHeader';

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
