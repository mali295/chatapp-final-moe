
import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { Courses, getAllCourses } from '../../core/services/courseService';
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from '@mui/material/TextField';

import Autocomplete from '@mui/material/Autocomplete';

import SimpleDialogDemo from '../Dashboard/event/createEventNew';
import BasicTable from './List/type-list';
import CreateAnnouncement from '../Dashboard/announcement/announcement';
import AnnouncementTable from './List/announcement-list';
import NavbarNewFinal from '../../NavBars/NavBarNewFinal';

const drawerWidth = 240;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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
  marginBottom:'2px',
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

export default function MiniDrawer() {
  //  const navigate = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [eventType, setEventType] = React.useState('');
  const [ignored, forceUpdate] = React.useReducer(x => x + 1, 0);
  const [events, setEvents] = React.useState([]);
  const [aList, setAlist] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      const filteredCourses = Courses.filter(el=> el.toLowerCase().startsWith(value.toLowerCase()));
      setOptions(filteredCourses);
    } else {
      setOptions([]);
    }
  };

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = (type) => {
    setEventType(type);
    console.log(type);
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
    forceUpdate();
    
  };


  const [openModalA, setOpenModalA] = React.useState(false);
  const handleOpenA = (e) => {
    setOpenModalA(true);
  };
  const handleCloseA = () => {
    setOpenModalA(false);
    forceUpdate();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavbarNewFinal/>
      <Box component="main" sx={{ flexGrow: 1, p: 1}}>
        <DrawerHeader />
     
     
        <List>
      
      <ListItem>
      <Box sx={{  height: '1vh' }} />
      </ListItem>
      <ListItem>
          <Typography variant = "h4" >
        ADMIN PAGES
          </Typography>
      </ListItem>
<Divider/>
   

      <ListItem>
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
        <Tab label="Announcements" {...a11yProps(0)} />
          <Tab label="Assignments" {...a11yProps(1)} />
          <Tab label="Quizzes" {...a11yProps(2)} />
          <Tab label="Labs" {...a11yProps(3)} />
          <Tab label="Exams" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <Button
              onClick = {(e) => handleOpenA(e)}
            >
              Add Announcement
            </Button>
            <AnnouncementTable ignored = {ignored} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Button
              onClick = {(e) => handleOpen('Assignments')}
            >
              Add Assignments
            </Button>
            <BasicTable ignored = {ignored} data='Assignments'></BasicTable>

      </TabPanel>
      <TabPanel value={value} index={2}>
      <Button
              onClick = {(e) => handleOpen('Quizzes')}
            >
              Add Quizzes
            </Button>
            <BasicTable ignored = {ignored} data='Quizzes'></BasicTable>

      </TabPanel>
      
      <TabPanel value={value} index={3}>
      <Button
              onClick = {(e) => handleOpen('Labs')}
            >
              Add Labs
            </Button>
            <BasicTable ignored = {ignored} data='Labs'></BasicTable>

      </TabPanel>
      <TabPanel value={value} index={4}>
      <Button
              onClick = {(e) => handleOpen('Exams')}
            >
              Add Exams
            </Button>
            <BasicTable ignored = {ignored} data='Exams'></BasicTable>

      </TabPanel>
      <SimpleDialogDemo dueDate = {null} eventType = {eventType} handleOpen = {handleOpen}  handleClose = {handleClose} open = {openModal} />
                    <CreateAnnouncement handleOpen = {handleOpenA}  handleClose = {handleCloseA} open = {openModalA}  />
    </Box>

  


      </ListItem>
    
    
      </List>



      </Box>
    </Box>
  );
}
