import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { TextField, Container, Grid } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import NavbarNewFinal from './NavBars/NavBarNewFinal';
import { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Themes/Theme';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function Account() {
  //window.onload = setCollapsible
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  /*
  *
  * ADDED FOR PROFILE
  * 
  */
  const [user, setUser] = React.useState("2510445588")
  const [profile, setProfile] = React.useState({})
  const [avatarSRC, setAvatarSRC] = React.useState('')

  useEffect(() => {
    let isMounted = true
    const getProfile = async(id) => {
      const request = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }

      const data = await fetch(`/profile/getJSON?id=${id}`, request).then(res => res.json()).then(data => {if (isMounted) {setProfile(data)
      setAvatarSRC(data.image)}})
    }

    getProfile(user).catch(console.error)
    return() => {isMounted=false}
  }, [user])

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
    <NavbarNewFinal/>
      <Box component="main" sx={{ flexGrow: 1, p: 1}}>
        <DrawerHeader />
     
     
        <List>
      
      <ListItem>
      <Box sx={{  height: '1vh' }} />
      </ListItem>
      <ListItem>
          <Typography variant = "h4" >
        Account
          </Typography>
      </ListItem>
<Divider/>
</List>



<Container maxWidth='100px'>
<Grid container direction='column'>
<Box height='450px'>
  <Grid container direction='row' justifyContent='space-between'>
    <Grid item xs={3}>
      <Box>
            <Avatar src={`/images/${avatarSRC}`} sx={{width: '200px', height:'200px', position: 'absolute', left: '10%', top:'250px'}}>
            </Avatar>
        </Box>
    </Grid>
    <Grid item xs={4}>
      <Box>
              {/*<Divider sx={{width: '100%', transform: 'translate(0px, 280px)'}}/>
              <Divider sx={{width: '100%', transform: 'translate(0px, 465px)'}}/>*/}
                    <Box sx={{height: '650px'}} display='flex' justifyContent='flex-end'>
                      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                        <Typography variant='h5' sx={{fontWeight: 'bold', textDecoration: 'underline'}}>Account Details</Typography>
                        <Box sx={{height:'20px'}}/>

                        <Typography variant='h6' sx={{fontWeight: 'bold'}}>Full Name</Typography>
                        <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.name} variant="outlined" sx={{width: '60%'}} style={{cursor: 'not-allowed'}}/>

                        <Box sx={{height: '20px'}}/>
                        <Typography variant='h6'>Username</Typography>                         
                        <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.username} variant="outlined" sx={{width: '60%'}}/>

                        <Box sx={{height: '20px'}}/>
                        <Typography variant='h6'>Student Number</Typography>
                        <TextField id="filled-basic" InputProps={{readOnly: true}} value={user} variant="outlined" sx={{width: '60%'}}/>

                        <Box sx={{height: '20px'}}/>
                        <Typography variant='h6'>Affiliation</Typography>
                        <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.affiliation} variant="outlined" sx={{width: '60%'}}/>

                      </Grid>
                    </Box>
                    
        </Box>
      </Grid>
    <Grid item xs={4}>
        <Box>
        <Box sx={{height: '650px'}}>
                      <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                        <Typography variant='h5' width='400px' textAlign='left' sx={{fontWeight: 'bold', textDecoration: 'underline'}}>Contact Information</Typography>

                          <Box sx={{height: '20px'}}/>
                          <Typography variant='h6'>Work E-Mail</Typography>
                          <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.email} variant="outlined" sx={{width: '60%'}}/>

                          <Box sx={{height: '20px'}}/>
                          <Typography variant='h6'>Secondary E-Mail</Typography>                         
                          <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.secondaryEmail} variant="outlined" sx={{width: '60%'}} />

                          <Box sx={{height: '20px'}}/>
                          <Typography variant='h6'>Phone Number</Typography>
                                                   
                          <TextField id="filled-basic" InputProps={{readOnly: true}} value={profile.number} variant="outlined" sx={{width: '60%'}} inputProps={{maxLength:10, type:'number'}}/>
                          

                        </Grid>
                    </Box>
        </Box>
      </Grid>
      </Grid>
      </Box>
      <Box height='300px'>
        <Box  borderRadius='10px' width='100%' style={{transform: 'translate(0px, 50px)'}}>
                            <Typography variant='h5' textAlign='left'>Biography</Typography>
                            <Grid container direction='row'>
                            <TextField multiline rows={4} InputProps={{readOnly: true}} sx={{width:'80%'}} value={profile.bio} inputProps={{maxLength:300}}/>
                            </Grid>
              </Box>
      </Box>
  </Grid>


</Container>

      
      </Box>
      
    </Box>

    </div>
    </ThemeProvider>
  );
}