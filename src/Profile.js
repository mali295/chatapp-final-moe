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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import { Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText, Container, Grid, CardMedia, Card } from '@mui/material';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add'
import NavbarNewFinal from './NavBars/NavBarNewFinal'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import plusImage from './PlusImage.webp'
import { useEffect } from 'react';
import axios from 'axios'
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Themes/Theme';

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

export default function Profile() {
  //window.onload = setCollapsible
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /*
  *
  * ADDED FOR PROFILE
  * 
  */

  const updateProfile = async (i, v, u) => {
    const request = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({item: i, value: v, user: u})
    }

    return new Promise((resolve, reject) => {
        fetch(`/profile/updateJSON`, request)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(error => reject(error))
    })
  }

  const loaderJSON = {
      "2510445588": {
      "name": "0",
      "affiliation": "0",
      "username": "0",
      "password": "0",
      "number": "123123",
      "email": "0",
      "secondaryEmail": "0",
      "bio": "0"
      }
    }

  const [user, setUser] = React.useState("2510445588")
  const [profile, setProfile] = React.useState(loaderJSON)
  const [avatarSRC, setAvatarSRC] = React.useState('')

  useEffect(() => {
    let isMounted = true
    const getProfile = async(id) => {
      const request = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }

      const data = await fetch(`/profile/getJSON?id=${id}`, request).then(res => res.json()).then(data => { if (isMounted) {setProfile(data) 
        setTempUsername(data.username)
        setTempPassword(data.password)
        setTempNumber(data.number)
        setTempSecondaryEmail(data.secondaryEmail)
        setAvatarSRC(data.image)}}).catch(error => console.error(error))
    }

    getProfile(user).catch(console.error)
    return () => {isMounted=false}
  }, [user])

  const setAvatar = (avatar) => {
    setAvatarSRC(avatar)
    handleUpdateItem('image', avatar)
    handleImageClose()
    window.location.reload()
  }
  

  const [openPassword, setOpenPassword] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState('')
  const [oldPassword, setOldPassword] = React.useState('')
  
    const handleClickOpenPassword = () => {
      setOpenPassword(true);
    };
  
    const handleClosePassword = () => {
      setOpenPassword(false);
    };

    const handleChangePassword = () => {
      
      if (newPassword != oldPassword) {
        if (oldPassword == profile.password) {
          if ((newPassword != null) || (newPassword.length !=0)) {
              handleUpdateItem('password')
              setTempPassword(newPassword)
              setOpenPassword(false);
          } else {
            alert("Please enter a valid new password")
          }
        } else {
          alert("These passwords don't match")
        }
      } else {
        alert("These passwords don't match")
      }
    };

    const [tempNumber, setTempNumber] = React.useState(0);
    const [tempPassword, setTempPassword] = React.useState("123456789");
    const [tempUsername, setTempUsername] = React.useState("");
    const [tempSecondaryEmail, setTempSecondaryEmail] = React.useState('');
    const [tempBio, setTempBio] = React.useState('');

    const handleUpdateItem = (item, a) => {
          if (item === 'username') {updateProfile('username', tempUsername, user)
          } else if (item === 'password') {updateProfile('password', newPassword, user)
          } else if (item === 'number') {updateProfile('number', tempNumber, user)
          } else if (item === 'secondaryEmail') {updateProfile('secondaryEmail', tempSecondaryEmail, user)
          } else if (item === 'bio') {updateProfile('bio', tempBio, user)
          } else if (item === 'image') { updateProfile('image', a, user)
          } else {}
    };

    
    const [imageDialog, setImageDialog] = React.useState(false)

    const handleImageOpen = () => {
      setImageDialog(true)
    }
    const handleImageClose = () => {
      setImageDialog(false)
    }

    const uploadImage = (e) => {
      const data = new FormData()
      data.append('file', e.target.files[0])
      data.append('user', user)
      axios.post("/profile/uploadFileAPI", data).then(res => {console.log(res.statusText)})
      handleImageClose()
      //window.location.reload()
    }

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
    <div>
    <Box sx={{ display: 'flex'}}>
    <NavbarNewFinal></NavbarNewFinal>
      
      
      <Box component="main" sx={{ flexGrow: 1, p: 1}}>
        <DrawerHeader />
     
     
        <List>
      
      <ListItem>
      <Box sx={{  height: '1vh' }} />
      </ListItem>
      <ListItem>
          <Typography variant = "h4" >
        Profile
          </Typography>
      </ListItem>
<Divider/>
</List>



<Container maxWidth='100px'>
<Grid container direction='row'>
    <Grid item xs={8}>
      <Box>
              <Divider sx={{width: '100%', transform: 'translate(0px, 280px)'}}/>
              <Divider sx={{width: '100%', transform: 'translate(0px, 465px)'}}/>
                <Grid container justifyContent='space-between'>
                  <Grid item xs={5.5}>
                    <Box sx={{height: '650px'}} display='flex' justifyContent='flex-end'>
                      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                        <Typography variant='h5'>Account Details</Typography>
                        <Box sx={{height:'20px'}}/>

                        <Typography variant='h6'>Full Name</Typography>
                        <TextField color='secondary' id="filled-basic" value={profile.name} variant="outlined" sx={{width: '100%'}} InputProps={{readOnly: true}}/>

                        <Box sx={{height: '20px'}}/>
                        <Typography variant='h6'>Student Number</Typography>
                        <TextField id="filled-basic" InputProps={{readOnly: true}} value={user} variant="outlined" sx={{width: '100%'}}/>

                        <Box sx={{height: '50px'}}/>

                        <Typography variant='h5' width='200%' textAlign='left'>Username & Password</Typography>

                        <Box sx={{height: '20px'}}/>
                        <Typography variant='h6'>Username</Typography>

                        <Grid container direction='row' justifyContent='space-between' alignItems='baseline'>                          
                            <TextField id="filled-basic" value={tempUsername} variant="outlined" sx={{width: '70%'}} onChange={(e) => {
                              setTempUsername(e.target.value)
                            }}/>
                            <Button variant="outlined" sx={{width: '20%'}} onClick={() => handleUpdateItem('username')} color='secondary'>
                              Update
                            </Button> 
                        </Grid>

                        <Box sx={{height: '50px'}}/>
                        <Typography variant='h5' width='200%' textAlign='left'>Other Contact Information</Typography>

                        <Box sx={{height: '20px'}}/>
                        <Typography variant='h6'>Phone Number</Typography>
                        <Grid container direction='row' justifyContent='space-between' alignItems='baseline'>                          
                            <TextField id="filled-basic" value={tempNumber} variant="outlined" sx={{width: '70%'}} inputProps={{maxLength:10, type:'number'}} onChange={(e) => {
                              setTempNumber(e.target.value)
                            }}/>
                            <Button variant="outlined" sx={{width: '20%'}} onClick={() => handleUpdateItem('number')} color='secondary'>
                              Update
                            </Button> 
                        </Grid>

                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={5.5}>
                    <Box sx={{height: '650px'}}>
                      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                          <Box sx={{height: '50px'}}/>

                          <Typography variant='h6'>Affiliation</Typography>
                          <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.affiliation} variant="outlined" sx={{width: '100%'}}/>

                          <Box sx={{height: '20px'}}/>
                          <Typography variant='h6'>Work E-Mail</Typography>
                          <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.email} variant="outlined" sx={{width: '100%'}}/>

                          <Box sx={{height: '80px'}}/>

                          <Box sx={{height: '20px'}}/>
                          <Typography variant='h6'>Password</Typography>
                          <Grid container direction='row' justifyContent='space-between' alignItems='baseline'>                          
                            <TextField id="filled-basic" InputProps={{readOnly: true}} value={Array(tempPassword.length+1).join('•')} variant="outlined" sx={{width: '70%'}}/>
                            <Button variant="outlined" sx={{width: '20%'}} onClick={handleClickOpenPassword} color='secondary'>
                              Change
                            </Button> 
                        </Grid>

                          <Box sx={{height: '80px'}}/>

                          <Box sx={{height: '20px'}}/>
                          <Typography variant='h6'>Secondary E-Mail</Typography>
                          <Grid container direction='row' justifyContent='space-between' alignItems='baseline'>                          
                            <TextField value={tempSecondaryEmail} variant="outlined" sx={{width: '70%'}} onChange={(e) => {
                              setTempSecondaryEmail(e.target.value)
                            }}/>
                            <Button variant="outlined" sx={{width: '20%'}} onClick={() => handleUpdateItem('secondaryEmail')} color='secondary'>
                              Update
                            </Button> 
                        </Grid>

                        </Grid>
                    </Box>
                  </Grid>

                </Grid>
      </Box>
    </Grid>
    <Grid item xs={4}>
        <Box>
            <Grid container direction='column' justifyContent='center' alignItems='center'>
            <Avatar src={`/images/${avatarSRC}`} sx={{width: 200, height:200, position: 'relative', zIndex:1}}>
            </Avatar>
              
              <Fab color='primary' aria-label='edit' style={{transform: 'translate(50px, -40px)', zIndex:2}}><AddIcon onClick={handleImageOpen}/></Fab>
              

              <Box  borderRadius='10px' width='90%' height='300px' style={{transform: 'translate(0px, 50px)'}}>
                            <Typography variant='h6'>Bio</Typography>
                            <TextField multiline rows={12} sx={{width:'90%'}} defaultValue={profile.bio} inputProps={{maxLength:300}} onChange={(e) => {
                              setTempBio(e.target.value)
                            }}/>

                            <Button variant="outlined" sx={{width: '20%'}} onClick={() => handleUpdateItem('bio')} style={{transform: 'translate(0px, 20px)'}} color='secondary'>
                              Update
                            </Button>
              </Box>
            </Grid>
        </Box>
      </Grid>
  </Grid>


</Container>
        <div>
        <Dialog open={openPassword} onClose={handleClosePassword}>
          <DialogTitle>Change Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please enter your previous and new password to change your password.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="oldPass"
              label="Old Password"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setOldPassword(e.target.value)
              }}
            />
            <TextField
              autoFocus
              margin="dense"
              id="oldPass"
              label="New Password"
              type="email"
              fullWidth
              variant="standard"
              onChange={(e) => {
                setNewPassword(e.target.value)
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClosePassword} color='secondary'>Cancel</Button>
            <Button onClick={handleChangePassword} color='secondary'>Change</Button>
          </DialogActions>
        </Dialog>
      </div>

      <div>
        <Dialog open={imageDialog} onClose={handleImageClose}>
          <DialogTitle sx={{width:'500px'}}>Change Profile Picture</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please select a provided photo or upload your own
            </DialogContentText>
            <Box height={'40px'}/>
            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
              <Button hidden onClick={() => setAvatar('avatar1')}>
                <img src={'/images/avatar1'} style={{borderRadius: '200px', width:'100px', height:'100px', objectFit:'cover'}} ></img>
              </Button>
              <Button hidden onClick={() => setAvatar('avatar2')}>
                <img src={'/images/avatar2'} style={{borderRadius: '200px', width:'100px', height:'100px', objectFit:'cover'}} ></img>
              </Button>
              <Button hidden onClick={() => setAvatar('avatar3')}>
                <img src={'/images/avatar3'} style={{borderRadius: '200px', width:'100px', height:'100px', objectFit:'cover'}} ></img>
              </Button>
              {/*<Button hidden component='label'>
                <input accept='image/*' hidden id='upload-photo' name='upload-photo' type='file' onChange={(e) => {
                              uploadImage(e)
                            }}/>
                <img src={plusImage} style={{borderRadius: '200px', width:'100px', height:'100px', objectFit:'cover'}} ></img>
              </Button>*/}
                <Fab color='primary' component='label' sx={{width: '100px', height: '100px'}} style={{transform: 'translate(10px)'}}><AddIcon/><input accept='image/*' hidden id='upload-photo' name='upload-photo' type='file' onChange={(e) => {
                              uploadImage(e)
                            }}/></Fab>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleImageClose} color='secondary'>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>

      
      </Box>
      
    </Box>

    </div>
    </ThemeProvider>
  );
}