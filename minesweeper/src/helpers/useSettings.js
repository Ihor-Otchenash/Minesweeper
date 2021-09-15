import { useState } from 'react';

// Gets the selection from the Menu form, defines the gameSettings state
export default function useSettings(initial = {}) {
  // create a state object for our game settings
  const [gameSettings, setGameSettings] = useState(initial);

  const handleSettingsChange = (e) => {
    const { value, name } = e.target;
    setGameSettings({
      ...gameSettings,
      [name]: parseInt(value),
    });
  };

  return {
    gameSettings,
    setGameSettings,
    handleSettingsChange,
  };
}
