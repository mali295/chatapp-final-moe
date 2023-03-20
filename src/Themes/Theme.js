import { amber, deepOrange, grey } from '@mui/material/colors';
import { createTheme } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      ...grey,
        main: grey[900],
    },
    secondary : {
      main: grey[50]
    },
    background: {
      default: '#2f3136',
      paper: '#202225',
    },
    text: {
        primary: grey[50],
        secondary: grey[400],
        sideText: grey[500]
    },
    navbarIcons: {
      main: grey[50]
    }, 
    sidebarIcons: {
      main: grey[50]
    },
    arrowIcons: {
      main: grey[50],
    }
  },
})

  const lightTheme = createTheme({
    palette: {
        mode: 'light',
        secondary: {
          main: '#1976d2'
        },
        navbarIcons: {
          main: grey[200]
        },
        sidebarIcons: {
          main: '#757575'
        },
        arrowIcons: {
          main: grey[800]
        },
        text: {
          sideText: grey[600]
        }
    }})


export {darkTheme, lightTheme};