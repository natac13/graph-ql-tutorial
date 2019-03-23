import React from 'react';
import { render } from 'react-dom';

import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import App from './routes';

import './stylesheets/base.scss';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#457B9D',
      // light: green[300],
      // dark: green[700],
    },
    secondary: {
      main: '#E63946',
      // light: yellow[300],
      // dark: yellow[800],
    },
  },
});

const renderApp = () =>
  render(
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>,
    document.getElementById('root')
  );

renderApp();
