import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from './Context';

const StyledMenu = styled.div`
  min-height: 100vh;
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 300;
    font-size: 4rem;
    margin-bottom: 2rem;
  }

  label {
    display: block;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }

  select {
    display: block;
    min-width: 16rem;
    color: #ffffff;
    padding: 0.75rem 2rem 0.875rem 1rem;
    margin-top: 0.5rem;
    outline: none;
    font-weight: 300;
    font-size: 1.5rem;
    appearance: none;
    border: 1px solid #fefefe;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMjQwLjgxMSAyNDAuODExIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNDAuODExIDI0MC44MTE7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iNTEycHgiIGhlaWdodD0iNTEycHgiIGNsYXNzPSIiPjxnPjxnPgoJPHBhdGggaWQ9IkV4cGFuZF9Nb3JlIiBkPSJNMjIwLjA4OCw1Ny42NjdsLTk5LjY3MSw5OS42OTVMMjAuNzQ2LDU3LjY1NWMtNC43NTItNC43NTItMTIuNDM5LTQuNzUyLTE3LjE5MSwwICAgYy00Ljc0LDQuNzUyLTQuNzQsMTIuNDUxLDAsMTcuMjAzbDEwOC4yNjEsMTA4LjI5N2wwLDBsMCwwYzQuNzQsNC43NTIsMTIuNDM5LDQuNzUyLDE3LjE3OSwwTDIzNy4yNTYsNzQuODU5ICAgYzQuNzQtNC43NTIsNC43NC0xMi40NjMsMC0xNy4yMTVDMjMyLjUyOCw1Mi45MTUsMjI0LjgyOCw1Mi45MTUsMjIwLjA4OCw1Ny42Njd6IiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBjbGFzcz0iYWN0aXZlLXBhdGgiIGRhdGEtb2xkX2NvbG9yPSIjMDAwMDAwIiBmaWxsPSIjRkZGRkZGIi8+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+Cgk8Zz4KCTwvZz4KCTxnPgoJPC9nPgoJPGc+Cgk8L2c+CjwvZz48L2c+IDwvc3ZnPg==');
    background-color: transparent;
    background-repeat: no-repeat;
    background-position: right 1rem top 50%;
    background-size: 1rem;
    border-radius: 0.25rem;
  }

  button {
    display: block;
    margin: 0 auto;
    margin-top: 3rem;
    font-size: 1.5rem;
    font-weight: 300;
    border-radius: 0.25rem;
    padding: 0.75rem 1rem;
    min-width: 12rem;
    cursor: pointer;
    border: 1px solid #ffffff;
    color: #ffffff;
    outline: none;
    background: none;
  }
`;

const gameOptions = {
  boardSize: {
    Small: '10',
    Medium: '14',
    Big: '18',
  },
  difficulty: {
    Easy: '10',
    Moderate: '20',
    Hard: '40',
  },
};

const handleSubmit = (e, setIsGameActive, setIsInMenu) => {
  e.preventDefault();
  setIsGameActive(true);
  setIsInMenu(false);
};

export default function Menu() {
  const { gameSettings, handleSettingsChange, setIsGameActive, setIsInMenu } =
    useContext(Context);
  const { boardSize, difficulty } = gameSettings;
  return (
    <StyledMenu>
      <h1>Minesweeper</h1>
      <form onSubmit={(e) => handleSubmit(e, setIsGameActive, setIsInMenu)}>
        <label htmlFor="boardSize">
          Choose Board Size
          <select
            name="boardSize"
            id="boardSize"
            onChange={handleSettingsChange}
            value={boardSize}
          >
            {Object.entries(gameOptions.boardSize).map(
              ([sizeName, sizeValue]) => (
                <option key={sizeName} value={sizeValue}>
                  {sizeName}
                </option>
              )
            )}
          </select>
        </label>
        <label htmlFor="difficulty">
          Choose Difficulty
          <select
            name="difficulty"
            id="difficulty"
            onChange={handleSettingsChange}
            value={difficulty}
          >
            {Object.entries(gameOptions.difficulty).map(
              ([difficultyName, difficultyValue]) => (
                <option key={difficultyName} value={difficultyValue}>
                  {difficultyName}
                </option>
              )
            )}
          </select>
        </label>
        <button type="submit">New Game</button>
      </form>
    </StyledMenu>
  );
}
