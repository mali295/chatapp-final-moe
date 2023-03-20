import * as React from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import SecurityIcon from "@mui/icons-material/Security";
import ListItem from "@mui/material/ListItem";
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './Themes/Theme';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";

import Grid from "@mui/material/Grid";
import mickey from "./cat.webp"; //picture

import CustomDay from "./Pages/Dashboard/calendar";
import Paper from "@mui/material/Paper";
import NestedModal from "./Pages/Dashboard/event/createEvent";
import {
  Events,
  getClientEvents,
  getSingleDate,
  getUpcomingEvents,
} from "./core/services/eventService";
import { Courses, getAllCourses } from "./core/services/courseService";
import { width } from "@mui/system";
import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import SimpleDialogDemo from "./Pages/Dashboard/event/createEventNew";
import ListEventCalendar from "./Pages/Dashboard/event/list-calendar-events";
import {
  getAllAnnouncements,
  getTypeAnnouncements,
} from "./core/services/announcementService";
import moment from "moment";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Collapse,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import NavbarNewFinal from "./NavBars/NavBarNewFinal";

const settings = ["Profile", "Account", "Dashboard", "Logout"];
const drawerWidth = 240;

const Item = styled(Paper)(({ theme }) => ({
  //backgroundColor: theme.palette.mode === "dark" ? "#202225" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Navbar() {
 // const navigate = useHistory();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const [openModal, setOpenModal] = React.useState(false);
  const [data, setData] = React.useState();
  const [results, setResults] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [upcomingEvents, setUpcomingEvents] = React.useState([]);
  const [clientEvents, setUpclientEvents] = React.useState([]);
  const [announcements, setUpAnnouncements] = React.useState([]);
  const [announcementTab, setUpAnnouncementTab] = React.useState(0);
  const [openAnnouncements, setOpenAnnouncements] = React.useState([]);
  const [openEvents, setOpenEvents] = React.useState([]);
  const [reminderDialogue, setReminderDialogue] = React.useState(false);
  const [update, setUpdate] = React.useState(false);

  React.useEffect(() => {
    getUpcomingEvents().then((data) => {
      setUpcomingEvents(data);
    });
    getAllAnnouncements().then((data) => {
      setUpAnnouncements(data?.data);
    });
    getClientEvents().then((data) => {
      setUpclientEvents([...data]);
    });
  }, [update]);

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

  const handleOpen = () => {
    alert("hello");
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  const getCalender = (e) => {
    console.log(e);
    getSingleDate(e).then((data) => {
      setData([
        ...data,
        ...announcements?.filter(
          (val) =>
            moment(val?.creationDate, "MMMM Do YYYY, h:mm:ss a")?.format(
              "YYYY-MM-DD"
            ) === e
        ),
      ]);
      setOpenModal(true);
    });
  };

  const onInputChange = (event, value, reason) => {
    if (value) {
      const filteredCourses = Courses.filter((el) =>
        el.toLowerCase().startsWith(value.toLowerCase())
      );
      setOptions(filteredCourses);
    } else {
      setOptions([]);
    }
  };

  const getFormattedDate = (date) => {
    return moment(date).format("MMM DD, h:mm a");
  };

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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarNewFinal />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />

        <List>
          <ListItem>
            <Box sx={{ height: "1vh" }} />
          </ListItem>
          <ListItem>
            <Typography variant="h4">UNICLUB</Typography>
          </ListItem>
          <Divider />
          <ListItem>
            <Grid container>
              <Grid item xs={6}>
                <Typography variant="h6">
                  The one and only place for studying needs
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6">
                  {moment().format("dddd, MMMM DD, YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </ListItem>

          <ListItem>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2} columns={16}>
                <Grid item xs={16} md={8}>
                  <Box style={{padding: theme.spacing(1)}}>
                    <List>
                      <ListItem>
                        <List style={{ width: "100%" }}>
                          <ListItem>
                            <Typography variant="h6">
                              <u>Annnouncements</u>
                              <ListEventCalendar
                                rows={data}
                                handleOpen={handleOpen}
                                handleClose={handleClose}
                                open={openModal}
                              />
                            </Typography>
                          </ListItem>
                          <Box sx={{ width: "100%" }} backgroundColor='primary'>
                            <Box
                              sx={{ borderBottom: 1, borderColor: "divider" }}
                            >
                              <Tabs
                                indicatorColor='secondary'
                                textColor='secondary'
                                value={announcementTab}
                                onChange={(e, newVal) => {
                                  setUpAnnouncementTab(newVal);
                                }}
                                aria-label="basic tabs example"
                              >
                                <Tab label="Weekly Announcements " />
                                <Tab label="Past announcements" />
                              </Tabs>
                            </Box>

                            {announcementTab === 0
                              ? announcements
                                  ?.filter(
                                    (val) =>
                                      moment(
                                        val.creationDate,
                                        "MMMM Do YYYY, h:mm:ss a"
                                      ) > moment()
                                  )
                                  ?.map((el) => (
                                    <ListItem>
                                      <Grid
                                        container
                                        style={{
                                          width: "100%",
                                          border: "1px solid grey",
                                          borderRadius: "5px",
                                          padding: "10px",
                                        }}
                                      >
                                        <Grid item xs={5}>
                                          <Typography variant="body1">
                                            {el.title}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={7}
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        >
                                          <Typography variant="body1">
                                            {moment(
                                              el.creationDate,
                                              "MMMM Do YYYY, h:mm:ss a"
                                            )?.format(
                                              "dddd, MMMM DD YYYY, h:mm a"
                                            )}
                                          </Typography>
                                          <Typography>
                                            {openAnnouncements?.find(
                                              (row) => row === el?.id
                                            ) ? (
                                              <ExpandLess
                                                style={{
                                                  marginTop: 5,
                                                  lineHeight: 0,
                                                  height: "14px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  setOpenAnnouncements([
                                                    ...openAnnouncements?.filter(
                                                      (row) => row !== el?.id
                                                    ),
                                                  ]);
                                                }}
                                              />
                                            ) : (
                                              <ExpandMore
                                                style={{
                                                  marginTop: 5,
                                                  lineHeight: 0,
                                                  height: "14px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  setOpenAnnouncements([
                                                    ...openAnnouncements,
                                                    el?.id,
                                                  ]);
                                                }}
                                              />
                                            )}
                                          </Typography>
                                        </Grid>
                                        <Collapse
                                          in={openAnnouncements?.find(
                                            (row) => row === el?.id
                                          )}
                                          timeout="auto"
                                          unmountOnExit
                                        >
                                          <Grid item xs={12}>
                                            <Typography variant="body1">
                                              {el.description}
                                            </Typography>
                                          </Grid>
                                        </Collapse>
                                      </Grid>
                                    </ListItem>
                                  ))
                              : announcements
                                  ?.filter(
                                    (val) =>
                                      moment(
                                        val.creationDate,
                                        "MMMM Do YYYY, h:mm:ss a"
                                      ) <= moment()
                                  )
                                  ?.map((el) => (
                                    <ListItem>
                                      <Grid
                                        container
                                        style={{
                                          width: "100%",
                                          border: "1px solid grey",
                                          borderRadius: "5px",
                                          padding: "10px",
                                        }}
                                      >
                                        <Grid item xs={5}>
                                          <Typography variant="body1">
                                            {el.title}
                                          </Typography>
                                        </Grid>
                                        <Grid
                                          item
                                          xs={7}
                                          style={{
                                            display: "flex",
                                            justifyContent: "end",
                                          }}
                                        >
                                          <Typography variant="body1">
                                            {moment(
                                              el.creationDate,
                                              "MMMM Do YYYY, h:mm:ss a"
                                            )?.format(
                                              "dddd, MMMM DD YYYY, h:mm a"
                                            )}
                                          </Typography>
                                          <Typography>
                                            {openAnnouncements?.find(
                                              (row) => row === el?.id
                                            ) ? (
                                              <ExpandLess
                                                style={{
                                                  marginTop: 5,
                                                  lineHeight: 0,
                                                  height: "14px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  setOpenAnnouncements([
                                                    ...openAnnouncements?.filter(
                                                      (row) => row !== el?.id
                                                    ),
                                                  ]);
                                                }}
                                              />
                                            ) : (
                                              <ExpandMore
                                                style={{
                                                  marginTop: 5,
                                                  lineHeight: 0,
                                                  height: "14px",
                                                  cursor: "pointer",
                                                }}
                                                onClick={() => {
                                                  setOpenAnnouncements([
                                                    ...openAnnouncements,
                                                    el?.id,
                                                  ]);
                                                }}
                                              />
                                            )}
                                          </Typography>
                                        </Grid>
                                        <Collapse
                                          in={openAnnouncements?.find(
                                            (row) => row === el?.id
                                          )}
                                          timeout="auto"
                                          unmountOnExit
                                        >
                                          <Grid item xs={12}>
                                            <Typography variant="body1">
                                              {el.description}
                                            </Typography>
                                          </Grid>
                                        </Collapse>
                                      </Grid>
                                    </ListItem>
                                  ))}
                          </Box>
                        </List>
                      </ListItem>
                      <ListItem>
                        <List style={{ width: "100%" }}>
                          <ListItem>
                            <Typography variant="h6">
                              <u>Upcoming Assessments</u>
                            </Typography>
                          </ListItem>
                          {upcomingEvents.length > 0 &&
                            upcomingEvents
                              ?.filter((event) => event.type !== "client")
                              .map((el) => (
                                <>
                                  <ListItem>
                                    <Grid
                                      container
                                      style={{
                                        width: "100%",
                                        border: "1px solid grey",
                                        borderRadius: "5px",
                                      }}
                                    >
                                      <Grid container xs={1}>
                                        <Grid
                                          item
                                          xs={6}
                                          style={{
                                            backgroundColor:
                                              el.eventType == "Exams" ||
                                              el.eventType == "Quizzes"
                                                ? "red"
                                                : el.eventType ==
                                                    "Assignments" ||
                                                  el.eventType == "Labs"
                                                ? "orange"
                                                : "#1664C0",
                                          }}
                                        ></Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={6}
                                        style={{
                                          padding: "10px 10px 10px 0",
                                        }}
                                      >
                                        <Typography variant="body1">
                                          {el.courseName + " " + el.gradeName}
                                        </Typography>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={5}
                                        style={{
                                          display: "flex",
                                          justifyContent: "end",
                                          padding: "10px",
                                        }}
                                      >
                                        <Typography variant="body1">
                                          {"Due : " +
                                            getFormattedDate(el.dueDate)}
                                        </Typography>
                                        <Typography>
                                          {openEvents?.find(
                                            (row) => row === el?.id
                                          ) ? (
                                            <ExpandLess
                                              style={{
                                                marginTop: 5,
                                                lineHeight: 0,
                                                height: "14px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                setOpenEvents([
                                                  ...openAnnouncements?.filter(
                                                    (row) => row !== el?.id
                                                  ),
                                                ]);
                                              }}
                                            />
                                          ) : (
                                            <ExpandMore
                                              style={{
                                                marginTop: 5,
                                                lineHeight: 0,
                                                height: "14px",
                                                cursor: "pointer",
                                              }}
                                              onClick={() => {
                                                setOpenEvents([
                                                  ...openAnnouncements,
                                                  el?.id,
                                                ]);
                                              }}
                                            />
                                          )}
                                        </Typography>
                                      </Grid>
                                      <Collapse
                                        in={openEvents?.find(
                                          (row) => row === el?.id
                                        )}
                                        timeout="auto"
                                        unmountOnExit
                                      >
                                        <Grid item xs={12}>
                                          <Typography variant="body1">
                                            {/* {el.description} */}hi
                                          </Typography>
                                        </Grid>
                                      </Collapse>
                                    </Grid>
                                  </ListItem>
                                </>
                              ))}
                        </List>
                      </ListItem>
                      <ListItem>
                        <List>
                          <ListItem>
                            <Typography variant="h6">
                              <u>Pending Chats</u>
                            </Typography>
                          </ListItem>

                          <ListItem>
                            <table>
                              <tbody>
                                <tr>
                                  <td>Course Code - </td>
                                  <td>Chat Name - </td>
                                  <td>Chat Message</td>
                                </tr>
                              </tbody>
                            </table>
                          </ListItem>
                        </List>
                      </ListItem>
                    </List>
                  </Box>
                </Grid>
                <Grid item xs={24} md={4}>
                  <CustomDay getCalender={getCalender} />
                </Grid>
                <Grid item xs={24} md={4}>
                  <Box style={{ minHeight: "70vh", textAlign: 'center', padding: theme.spacing(1)}}>
                    <Button
                      color="primary"
                      variant="contained"
                      style={{ textAlign: "center" }}
                      onClick={() => {
                        setReminderDialogue(!reminderDialogue);
                      }}
                    >
                      Add Reminder
                    </Button>

                    <SimpleDialogDemo
                      open={reminderDialogue}
                      handleClose={() => {
                        setReminderDialogue(!reminderDialogue);
                      }}
                      update={update}
                      setUpdate={setUpdate}
                      type="client"
                    />
                    <List>
                      {clientEvents?.map((el) => {
                        return (
                          <ListItem>
                            <Accordion style={{ width: "100%" }}>
                              <AccordionSummary expandIcon={<ExpandMore />}>
                                <div
                                  style={{
                                    width: "10px",
                                    marginRight: "5px",

                                    backgroundColor: "green",
                                  }}
                                ></div>
                                <Typography variant="body1">
                                  {el.courseName + " " + el.gradeName}
                                </Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <Typography variant="body1">
                                  {"Due : " + getFormattedDate(el.dueDate)}
                                </Typography>
                              </AccordionDetails>
                            </Accordion>
                          </ListItem>
                        );
                      })}
                    </List>
                    {/* <Dialog
                      open={reminderDialogue}
                      onClose={() => {
                        setReminderDialogue(!reminderDialogue);
                      }}
                    >
                      <Grid>
                        <DialogTitle id="alert-dialog-title">Title</DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            {" "}
                            hi this is some text for the reminder
                          </DialogContentText>
                        </DialogContent>
                      </Grid>
                    </Dialog> */}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </ListItem>
        </List>
      </Box>
    </Box>
    </ThemeProvider>
  );
}
