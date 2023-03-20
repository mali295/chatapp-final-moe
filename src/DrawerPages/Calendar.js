import * as React from 'react';

import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';



import NavbarHome from '../NavBars/NavbarHome';



export default function Calendar() {

 
  return (
    <Box>
        <NavbarHome/>
        <Grid mt= '100px'>
            Calendar
        </Grid>
    </Box>
  );
}