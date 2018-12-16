import React from 'react';
import PropTypes from 'prop-types';

import {
  MuiThemeProvider,
  createMuiTheme,
  withTheme as muiWithTheme,
} from '@material-ui/core/styles';
import {ThemeProvider} from 'styled-components';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});
const appTheme = {
  colors: {
    activeMenu: '#feefc3'
  }
};

const MaterialUiTheme = ({children}) => (
  <MuiThemeProvider theme={muiTheme}>
    {children}
  </MuiThemeProvider>
);

MaterialUiTheme.propTypes = {
  children: PropTypes.node,
};

const StyledComponentsTheme = ({theme, children}) => (
  <ThemeProvider theme={{ app: appTheme, mui: theme }}>
    {children}
  </ThemeProvider>
);

StyledComponentsTheme.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.object,
};

const StyledComponentsThemeWithMui = muiWithTheme()(StyledComponentsTheme);

export const WithTheme = ({children}) => {
  return (
    <MaterialUiTheme>
      <StyledComponentsThemeWithMui>
        {children}
      </StyledComponentsThemeWithMui>
    </MaterialUiTheme>
  );
}

WithTheme.propTypes = {
  children: PropTypes.node,
};
