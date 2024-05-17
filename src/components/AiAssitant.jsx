import React, { useEffect, useContext } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

import { ThemeModeContext } from '../utils/ToggleThemeMode';

const useAiAssistant = () => {
  const { setMode } = useContext(ThemeModeContext);

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_AI_ALAN_KEY,
      onCommand: ({ command, mode }) => {
        console.log(mode);
        if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        }
      },
    });
  }, []);
};

export default useAiAssistant;
