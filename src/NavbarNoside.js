import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import SearchIcon from '@mui/icons-material/Search';

import Switch from '@mui/material/Switch'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import SettingsIcon from '@mui/icons-material/Settings'
import NotificationsNone from '@mui/icons-material/NotificationsNone'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useEffect } from 'react';



import { darkTheme, lightTheme } from './Themes/Theme';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const drawerWidth = 240;

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function NavbarNewFinal() {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

    /*
  *
  * ADDED FOR AVATAR
  * 
  */
    const [user, setUser] = React.useState("2510445588")
    const [avatarSRC, setAvatarSRC] = React.useState('')
  
    useEffect(() => {
      let isMounted = true
      const getProfile = async(id) => {
        const request = {
          method: 'GET',
          headers: {'Content-Type': 'application/json'},
        }
  
        const data = await fetch(`/profile/getJSON?id=${id}`, request).then(res => res.json()).then(data => {if (isMounted) {setAvatarSRC(data.image)}})
      }
  
      getProfile(user).catch(console.error)
      return() => {isMounted=false}
    }, [user])


    /**
     * SETTINGS AND DARK MODE
     **/
    const theme = useTheme()
    //const {darkMode, setDarkMode} = localStorage.getItem('preferred-theme')

    /**
     * THEME MANAGER
     */
    const [storageTheme, setStorageTheme] = React.useState(window.localStorage.theme)
    const handleChangeTheme = () => {
      if (window.localStorage.theme === 'light') {
        setThemeInStorage('dark')
        setStorageTheme('dark')
        setIsDarkMode(true)
      } else {
        setThemeInStorage('light')
        setStorageTheme('light')
        setIsDarkMode(false)
      }
      const event = document.createEvent('Event')
      event.initEvent('storageChanged', true, true)
      document.dispatchEvent(event)
    }
    const setThemeInStorage = (theme) => {
      window.localStorage.setItem("theme", theme)
    }

    const getCurrentTheme = () => {
      if (storageTheme === 'dark') {
        return darkTheme
      } else {
        return lightTheme
      }
    }

    const isDark = () => {
      if (storageTheme === 'dark') {
        return true
      } else {
        return false
      }
    }
    const [isDarkMode, setIsDarkMode] = React.useState(isDark())
    

  return (
    <ThemeProvider theme={getCurrentTheme()}>
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
      <Toolbar>
     

          <IconButton  color="inherit">
          <Typography variant = "h4" >
        UNICLUB
          </Typography>
          </IconButton>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
       
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
         
            <Button  component={Link} to= "/Home"  sx={{ my: 2, color: 'white', display: 'block' }}>
              HOME
            </Button>







            
            <Button>
            

            <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button sx={{ my: 1, color: 'white' }} {...bindTrigger(popupState)}>
            COURSES
          </Button>




          <Menu {...bindMenu(popupState)}>
            <MenuItem component={Link} to='/CourseHome' onClick={popupState.close}>COURSE 1</MenuItem>
            <MenuItem component={Link} to='/CourseHome' onClick={popupState.close}>COURSE 2</MenuItem>
            <MenuItem component={Link} to='/CourseHome' onClick={popupState.close}>COURSE 3</MenuItem>
            <MenuItem component={Link} to='/CourseHome' onClick={popupState.close}>COURSE 4</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>



            </Button>
    
          
         
    
  


    <Button component={Link} to= "/Gradebook"  sx={{ my: 2, color: 'white', display: 'block' }}>
           GRADEBOOK
            </Button>
            <Button  component={Link} to= "/Assignments" sx={{ my: 2, color: 'white', display: 'block' }}>
            ASSIGNMENTS
            </Button>
            <Button>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button
                      sx={{ my: 1, color: "white" }}
                      {...bindTrigger(popupState)}
                    >
                      ADMIN
                    </Button>

                    <Menu {...bindMenu(popupState)}>
                      <MenuItem
                        component={Link}
                        to="/Announcements"
                        onClick={popupState.close}
                      >
                        EventsAdmin
                      </MenuItem>
                      <MenuItem
                        component={Link}
                        to="/Gradebook2"
                        onClick={popupState.close}
                      >
                        GradebookAdmin
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
            </Button>
          </Box>
          <Box sx={{flexGrow:0.05}}>
            <Tooltip title='Switch Theme'>
              <Switch color='default' onChange={handleChangeTheme} checked={isDarkMode}></Switch>
            </Tooltip>
          </Box>
          <Box sx={{flexGrow:0.05}}>
            <Tooltip title='Open Chat'>
              <IconButton color='navbarIcons'>
                <ChatBubbleOutlineIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{flexGrow:0.05}}>
            <Tooltip title='Open Notifications'>
              <IconButton color='navbarIcons'>
                <NotificationsNone/>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{flexGrow:0.05}}>
            <Tooltip title='Open Settings'>
              <IconButton color='navbarIcons'>
                <SettingsIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          <Box sx={{flexGrow:0.05}}></Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="avatar" src={`/images/${avatarSRC}`}/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => {
                if (setting === "Profile") {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu} component={Link} to="/Profile">
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                )
                } else if (setting === "Account") {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu} component={Link} to="/Account">
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                  } else if (setting === "Dashboard") {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu} component={Link} to="/Dashboard">
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                  } else {
                  return (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  )
                }
              })}
            </Menu>
          </Box>

          <Divider/>
          
          
        </Toolbar>
      </AppBar>
    
      <Box component="main" sx={{ flexGrow: 1, p: 1}}>
       


      </Box>
    </Box>
    </ThemeProvider>
  );
}