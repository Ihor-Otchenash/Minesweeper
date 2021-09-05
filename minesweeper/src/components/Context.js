import React, { useState, createContext, useEffect } from 'react';
import useSettings from '../helpers/useSettings';

const Context = createContext();

function ContextProvider({ children }) {
  const defaultGameSettings = {
    boardSize: 10,
    difficulty: 10,
  };
  const { gameSettings, setGameSettings, handleSettingsChange } =
    useSettings(defaultGameSettings);
  const [isGameOn, setIsGameOn] = useState(false);

  const resetGameSettings = () => {
    setGameSettings(defaultGameSettings);
  };

  return (
    <Context.Provider
      value={{
        isGameOn,
        setIsGameOn,
        gameSettings,
        handleSettingsChange,
        resetGameSettings,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
