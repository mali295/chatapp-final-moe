import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';

import { ThemeProvider } from 'styled-components';

import NavbarNewFinal from '../NavBarNewFinal';
import { darkTheme, lightTheme } from '../Themes/Theme';


export default function Announcements() {

  const [currentTheme, setCurrentTheme] = React.useState(window.localStorage.theme)
    window.addEventListener('storageChanged', (e) => {
        e.preventDefault()
        setCurrentTheme(window.localStorage.theme)
      });

      const getCurrentTheme = () => {
        if (currentTheme === 'dark') {
          return darkTheme
        } else {
          return lightTheme
        }
      }
  return (
    <ThemeProvider theme={getCurrentTheme}>
    <Box>
        <NavbarNewFinal/>
        <Grid mt= '100px'>
            Announcements
        </Grid>
    </Box>
    </ThemeProvider>
  );
}