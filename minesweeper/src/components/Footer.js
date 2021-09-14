import { useContext } from 'react';
import styled from 'styled-components';
import { Context } from './Context';
import mouseImage from '../assets/mouse.svg';

const StyledFooter = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;

  button {
    display: block;
    margin: 0 1rem;
    font-size: 1rem;
    font-weight: 300;
    border-radius: 0.25rem;
    padding: 0.5rem 0.25rem;
    min-width: 10rem;
    cursor: pointer;
    border: 1px solid #ffffff;
    color: #ffffff;
    outline: none;
    background: none;
  }

  img {
    height: 2rem;
    width: 2rem;
    margin: 0 0.5rem;
  }
`;

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
