import { createTheme } from '@mui/material';
import { customTheme } from './custom';

const theme = createTheme({
  palette: {
    mode: customTheme?.palette.mode || 'light',
    common: {
      black: customTheme ? customTheme.palette.common.black : '#000',
      white: customTheme ? customTheme.palette.common.white : '#fff',
    },
    primary: {
      main: customTheme
        ? customTheme.palette.primary.main
        : '#1976D2',
      light: customTheme
        ? customTheme.palette.primary.light
        : '#BBDEFB',
      dark: customTheme
        ? customTheme.palette.primary.dark
        : '#0D47A1',
      contrastText: customTheme
        ? customTheme.palette.primary.contrastText
        : '#000',
    },
    secondary: {
      main: customTheme
        ? customTheme.palette.secondary.main
        : '#4CAF50',
      light: customTheme
        ? customTheme.palette.secondary.light
        : '#C8E6C9',
      dark: customTheme
        ? customTheme.palette.secondary.dark
        : '#388E3C',
      contrastText: customTheme
        ? customTheme.palette.secondary.contrastText
        : '#fff',
    },
    gray: {
      lightest: customTheme
        ? customTheme.palette.gray.lightest
        : '#F5F5F5',
      lighter: customTheme
        ? customTheme.palette.gray.lighter
        : '#EEEEEE',
      light: customTheme ? customTheme.palette.gray.light : '#E0E0E0',
      dark: customTheme ? customTheme.palette.gray.dark : '#BDBDBD',
      darker: customTheme
        ? customTheme.palette.gray.darker
        : '#9E9E9E',
    },
    text: {
      primary: customTheme
        ? customTheme.palette.text.primary
        : '#000',
      secondary: customTheme
        ? customTheme.palette.text.secondary
        : '#000', // Check if this is the desired default value
      disabled: customTheme
        ? customTheme.palette.text.disabled
        : '#5B5B5B',
    },
    standardSuccess: {
      backgroundColor: '#4CAF50',
      color: '#fff',
    },
    standardError: {
      backgroundColor: '#FF0000',
      color: '#fff',
    },
  },

  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: customTheme
            ? customTheme.alertComponent.standardSuccess
                .backgroundColor
            : '#4CAF50',
          color: customTheme
            ? customTheme.alertComponent.standardSuccess.color
            : '#fff',
        },
        standardError: {
          backgroundColor: customTheme
            ? customTheme.alertComponent.standardError.backgroundColor
            : '#FF0000',
          color: customTheme
            ? customTheme.alertComponent.standardError.color
            : '#FFCCCC',
        },
        standardWarning: {
          backgroundColor: customTheme
            ? customTheme.alertComponent.standardWarning
                .backgroundColor
            : '#FF8C00',
          color: customTheme
            ? customTheme.alertComponent.standardWarning.color
            : '#FFE8CC',
        },
        standardInfo: {
          backgroundColor: customTheme
            ? customTheme.alertComponent.standardInfo.backgroundColor
            : '#55ABFF',
          color: customTheme
            ? customTheme.alertComponent.standardInfo.color
            : '#CCE6FF',
        },
      },
    },
  },
});

export default theme;
