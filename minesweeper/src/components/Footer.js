import { useContext } from 'react';
import { Context } from './Context';

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
    <div>
      {isGameActive ? (
        'Controls Description'
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
    </div>
  );
}
