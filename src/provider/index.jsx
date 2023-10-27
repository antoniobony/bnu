import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';
import CssBaseline from '@mui/material/CssBaseline';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme';
import Authcontext from '../context/Authcontext';
import { useState } from 'react';
import Authenticate from '../components/Authenticate/Authenticate';



const AppProvider = ({ children }) =>{ 
  return(
    <HelmetProvider>
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }} autoHideDuration={3000}>
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  </HelmetProvider>
)}

AppProvider.propTypes = {
  children: PropTypes.object
};
export default AppProvider;