import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';


import NavbarNewFinal from './NavBars/NavBarNewFinal';
import { darkTheme, lightTheme } from './Themes/Theme';


import testing from "./Testing"



export default function Assignments() {

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
    <Box>
        <NavbarNewFinal/>
        <Grid mt= '100px'>
            <testing/>
        </Grid>
    </Box>
  );
}