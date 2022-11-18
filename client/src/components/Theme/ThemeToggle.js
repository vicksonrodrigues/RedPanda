/* eslint-disable react/jsx-no-constructed-context-values */
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { getDesignTokens } from './theme';

const ThemeUpdateContext = createContext({ toggleColorMode: () => {} });

export const ThemeToggle = ({ children }) => {
  const [mode, setMode] = useState('light');

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  return (
    <ThemeUpdateContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeUpdateContext.Provider>
  );
};

export const useThemeUpdate = () => useContext(ThemeUpdateContext);
