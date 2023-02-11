/* eslint-disable import/prefer-default-export */
export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: {
            main: '#33251a',
            light: '#5d4d41',
            dark: '#100000',
            contrastText: '#fdfefd',
          },
          secondary: {
            main: '#a8763e',
            light: '#dca56a',
            dark: '#764a13',
            contrastText: '#0d1010',
          },
          neutral: {
            main: '#6f1a07',
          },

          text: {
            primary: 'rgba(0, 0, 0, 0.87)',
            secondary: 'rgba(0, 0, 0, 0.54)',
            disabled: 'rgba(0, 0, 0, 0.38)',
            hint: 'rgba(0, 0, 0, 0.38)',
          },
          background: {
            default: '#fafafa',
            paper: '#fff',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#33251a',
            light: '#5d4d41',
            dark: '#100000',
            contrastText: '#fdfefd',
          },
          secondary: {
            main: '#a8763e',
            light: '#dca56a',
            dark: '#764a13',
            contrastText: '#0d1010',
          },
          neutral: {
            main: '#6f1a07',
          },
          text: {
            primary: '#fff',
            secondary: 'gba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.5)',
            hint: 'rgba(255, 255, 255, 0.5)',
          },
          background: {
            default: '#303030',
            paper: '#424242',
          },
        }),
  },
  typography: {
    fontFamily: 'Oswald',
    fontWeightMedium: 600,
  },
});
