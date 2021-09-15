import { useContext } from 'react';
import { Context } from './Context';
import mouseImage from '../assets/mouse.svg';
import StyledFooter from '../styles/StyledFooter';

const startNewGame = (setIsInMenu, resetGameSettings) => {
  resetGameSettings();
  setIsInMenu(true);
};

const restartGame = (setIsGameActive, resetGameSettings, gameSettings) => {
  const sameGameSettings = { ...gameSettings };
  resetGameSettings(sameGameSettings);
  setIsGameActive(true);
};

export default function Footer() {
  const {
    isGameActive,
    setIsGameActive,
    setIsInMenu,
    gameSettings,
    resetGameSettings,
  } = useContext(Context);
  return (
    <StyledFooter>
      {isGameActive ? (
        <>
          <span>Open Cell</span>
          <img className="icon" src={mouseImage} alt="" />
          <span>Place Flag</span>
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={() => startNewGame(setIsInMenu, resetGameSettings)}
          >
            New Game
          </button>
          <button
            type="button"
            onClick={() =>
              restartGame(setIsGameActive, resetGameSettings, gameSettings)
            }
          >
            Restart
          </button>{' '}
        </>
      )}
    </StyledFooter>
  );
}
