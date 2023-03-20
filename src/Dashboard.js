import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import { TextField, Container, Grid, ListItemText, IconButton, Select, MenuItem, FormControl, InputLabel, filledInputClasses, Toolbar } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import NavbarNewFinal from './NavBars/NavBarNewFinal';
import { useEffect } from 'react';
import Button from '@mui/material/Button';

import { DataGrid } from '@mui/x-data-grid';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import { darkTheme, lightTheme } from './Themes/Theme';
import { ThemeProvider } from 'styled-components';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

import { GoogleMap, Marker, withGoogleMap, withScriptjs, InfoWindow } from 'react-google-maps';
import {withProps, compose} from 'recompose'
import DialogContentText from '@mui/material/DialogContentText';

import PieChart, {
  Legend,
  Export,
  Series,
  Label,
  Font,
  Connector,
  Size,
  Tooltip as PieTooltip
} from 'devextreme-react/pie-chart';

import CompletionChart from './CompletionChart';
import mapLocations from './mapLocations.json'

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

/**
 * ADDED FOR DASHBOARD
 */

 const columnsCompleted = [
    { field: 'courseName', headerName: 'Course Name', flex: 40 },
    
    { field: 'credits', headerName: 'Credits', flex: 30},
    { field: 'grade', headerName: 'Grade', flex: 30},
  ];
  const columnsRequired = [
    { field: 'courseName', headerName: 'Course Name', flex: 40 },
    { field: 'description', headerName: 'Description', flex: 70},
    { field: 'credits', headerName: 'Credits', flex: 30}
  ];
  const columnsElectives = [
    { field: 'courseName', headerName: 'Course Name', flex: 40 },
    { field: 'description', headerName: 'Description', flex: 70},
    { field: 'credits', headerName: 'Credits', flex: 30}
  ];

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(29, 31, 33, 1)'
        : 'rgba(29, 31, 33, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
      marginLeft: theme.spacing(1),
    },
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(35, 37, 40, 0.8)'
        : 'rgba(29, 31, 33, 0)',
  }));

  const MyCoursesBox = styled(Box)(({theme}) => ({
    backgroundColor:
    theme.palette.mode === 'dark'
        ? 'rgba(35, 37, 40, 0.8)'
        : 'rgba(29, 31, 33, 0)',
  }))





export default function Dashboard() {
  //window.onload = setCollapsible
  const [theme, setTheme] = React.useState(useTheme());
  const [open, setOpen] = React.useState(false);


  function Map() {
    const [selectedLocation, setSelectedLocation] = React.useState(null)

    return (
      <GoogleMap defaultZoom={15} defaultCenter={{ lat: 43.009785359209566, lng: -81.2737443315751 }}>
            {mapLocations.features.map(map => (
                <Marker key={map.properties.PARK_ID}
                position={{
                  lat: map.geometry.coordinates[0],
                  lng: map.geometry.coordinates[1]
                }}
                onClick = {() => {
                  setSelectedLocation(map)
                }}
                />
            ))}

            {selectedLocation && (
              <InfoWindow
                  onCloseClick={() => {
                    setSelectedLocation(null);
                  }}
                  position={{
                    lat: selectedLocation.geometry.coordinates[0],
                    lng: selectedLocation.geometry.coordinates[1]
                  }}
                >
                  <div>
                    <Typography color='#000000'>{selectedLocation.properties.NAME}</Typography>
                    <p>{selectedLocation.properties.DESCRIPTIO}</p>
                  </div>
                </InfoWindow>
            )}
            
          </GoogleMap>
    )
  }

  const MapWrapped = withScriptjs(withGoogleMap(Map));

  /**
   * ADDED FOR PERCENTAGE CHART
   */
   const [user, setUser] = React.useState("2510445588")

  const [programInfo, setProgramInfo] = React.useState([])

    const [userButtons, setUserButtons] = React.useState([])

    useEffect(() => {
        let isMounted = true
        const getUserButtons = async(id) => {
          const request = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
          }
    
          const data = await fetch(`/button/getUserButtons?id=${id}`, request).then(res => res.json()).then(data => {if (isMounted) {setUserButtons(data)}})
        }
    
        getUserButtons(user).catch(console.error)
        return() => {isMounted=false}
      }, [user])

    const [addButtonOpen, setAddButtonOpen] = React.useState(false)
    
    const handleAddButtonOpen = () => {
        setAddButtonOpen(true)
    }
    const handleAddButtonClose = () => {
        setAddButtonOpen(false)
    }

    const [buttonURL, setButtonURL] = React.useState('')
    const [buttonName, setButtonName] = React.useState('')
    const handleAddButtonAdd = () => {
        if(userButtons.length < 5) {
            createNewButton(buttonName, buttonURL, user)
            handleAddButtonClose()
            window.location.reload()
        } else {
            alert('You have added the maximum amount of buttons')
            handleAddButtonClose()
        }
    }

    const createNewButton = async (name, url, user) => {
        const request = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name: name, url: url, user: user})
        }
    
        return new Promise((resolve, reject) => {
            fetch(`/button/addUserButton`, request)
            .then(res => res.json())
            .then(data => resolve(data))
            .catch(error => reject(error))
        })
      }

  /*
  *
  * ADDED FOR COURSE TABLE
  * 
  */
 const [rows, setRows] = React.useState([])
 const [requiredRows, setRequiredRows] = React.useState([])
 const [currentAverage, setCurrentAverage] = React.useState(0)
 const [currentCredits, setCurrentCredits] = React.useState(0)

 const calculateCurrentAverage = (data) => {
  let credits = 0;
  let grades = 0;
  for (let i=0; i<data.length; i++) {
    credits = credits + data[i].credits
    grades = grades + data[i].grade
  }

  setCurrentCredits(credits)
  setCurrentAverage((grades / (credits*2)).toFixed(2))
 }

  useEffect(() => {
    let isMounted = true
    const getCourses = async(id) => {
      const request = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }

      const data = await fetch(`/course/getCourses?id=${id}`, request).then(res => res.json()).then(data => {if (isMounted) {setRows(data); calculateCurrentAverage(data)}})
    }

    getCourses(user).catch(console.error)
    return() => {isMounted=false}
  }, [user])

  const [program, setProgram] = React.useState(['Software Engineering', 'Musical Studies'])

  useEffect(() => {
    let isMounted = true
    const getRequiredCourses = async(prog) => {
      const request = {
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }
      //FORMAT QUERY STRING
      let str = ''
      for (let i=0; i < prog.length; i++) {
        if (i===0) {
          str = str + `program[]=${prog[i]}`
        } else {
          str = str + `&program[]=${prog[i]}`
        }
      }
      const data = await fetch(`/course/getRequiredCourses?${str}`, request).then(res => res.json()).then(data => {if (isMounted) {setProgramInfo(data); calculatePieData(data)}})
    }

    getRequiredCourses(program).catch(console.error)
    return() => {isMounted=false}
  }, [user])


  // Table info
  const [chartInfoOpen, setChartInfoOpen] = React.useState(false)

    const handleChartInfoOpen = () => {
        setChartInfoOpen(true)
    }
    const handleChartInfoClose = () => {
        setChartInfoOpen(false)
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

      //ACCORDION CONTROLS
      const [expanded, setExpanded] = React.useState('panel0');

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

      /**
       * CALCULATOR CONTROLS
       */

       const [calcInputAmount, setCalcInputAmount] = React.useState([
        {
          name: '',
          credit: '',
          grade: '',
          id: 1,
        }
      ])

      const changeCreditValue = (index, e) => {
        let arr = [...calcInputAmount]
        arr[index].credit = e.target.value
        setCalcInputAmount(arr)
      }
      const changeGradeValue = (index, e) => {
        let arr = [...calcInputAmount]
        arr[index].grade = e.target.value
        setCalcInputAmount(arr)
      }
      const changeNameValue = (index, e) => {
        let arr = [...calcInputAmount]
        arr[index].name = e.target.value
        setCalcInputAmount(arr)
      }

      const [desiredAverage, setDesiredAverage] = React.useState('')
      const changeDesiredAverage = (e) => {
        setDesiredAverage(e.target.value)
      }

      const handleDeleteCalc = (index) => {
        if (calcInputAmount.length > 1) {
          setCalcInputAmount(calcInputAmount => calcInputAmount.filter(x => x !== calcInputAmount[index]))
        }
      }

      const useCalculator = () => {
        let credits = currentCredits
        let grades = currentAverage * credits * 2
        let calculatedCourses = []
        for (let i=0; i<calcInputAmount.length; i++) {
          if (calcInputAmount[i].credit === '') {
            alert('Please enter a valid credit value for ' + calcInputAmount[i].name)
            return
          } else if (calcInputAmount[i].grade === '') {
            alert('Please enter a valid grade for ' + calcInputAmount[i].name)
            return
          } else {
            if (calcInputAmount[i].credit === 0.5) {
              credits = credits + calcInputAmount[i].credit
              grades = grades + parseInt(calcInputAmount[i].grade)
            } else {
              credits = credits + calcInputAmount[i].credit
              grades = grades + (parseInt(calcInputAmount[i].grade)*2)
            }
          }
        }
        console.log(calculatedCourses)
        setDesiredAverage((grades/(credits*2)).toFixed(2)+'%')
      }

      /**
       * CHART FUNCTIONALITIES
       */

      const [pieData, setPieData] = React.useState([])
      const [piePercentage, setPiePercentage] = React.useState(0)

      const calculatePieData = (input) => {
        let totalCredits = 5;
        let totalModuleCredits = 1;
        let totalElectiveCredits = 6;
        let completedElectiveCredits = 7;
        let completedModuleCredits = 9;

        /*for (let i=0; i < input.length; i++) {
          totalCredits = totalCredits + input[i].totalCredits
          totalModuleCredits = totalModuleCredits + input[i].totalModuleCredits
          totalElectiveCredits = totalElectiveCredits + input[i].totalElectiveCredits

          
          for (let y=0; y<rows.length; y++) {
            //FOR MODULE CREDITS
            for (let x=0; x < input[i].required.length; x++) {
              if (rows[y].courseName == input[i].required[x].courseName) {
                completedModuleCredits = completedModuleCredits + input[i].required[x].credits
              }
            }

            //FOR ELECTIVES --- NEEDS TO BE UPDATED WHEN PROPER ELECTIVE BACKEND FORMAT ADDED 
            for (let z=0; z < input[i].recommended.length; z++) {
              if (rows[y].courseName == input[i].recommended[z].courseName) {
                completedElectiveCredits = completedElectiveCredits + input[i].recommended[z].credits
              }
            }
          }
        }*/
        
        const data = [
          {
            title: 'Completed Courses',
            completion: (completedModuleCredits )
          },
          {
            title: 'Remaining Electives',
            completion: (totalElectiveCredits)
          },
          {
            title: 'Remaining Module Courses',
            completion: (totalModuleCredits)
          }
        ]

        setPiePercentage((((completedElectiveCredits + completedModuleCredits) / totalCredits)*100).toFixed(0))
        setPieData(data)
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
        Dashboard
          </Typography>
      </ListItem>
        <Divider/>
        </List>



<Container maxWidth='100px'>
<Divider sx={{width: '90%', position: 'absolute', transform: 'translate(0px, 370px)'}}/>
<Box height='10000px'>
<Grid container direction='column'>
<Grid item xs={5}>
<Grid container direction='column' justifyContent='space-between'>
    <Box height='370px'>
    <Grid container direction='row' justifyContent='space-between'>
    <Grid item xs={2}>
        <Box height='40px'></Box>
      <Box >
        <Grid container direction='column' justifyContent='space-evenly' alignItems='flex-start' >
        <Typography textAlign='left' variant='h5'>Links</Typography>
        <Box height='20px'></Box>
        <Grid container direction='column' alignItems='flex-start' justifyContent='flex-start' spacing={2}>
            {userButtons.map((button, index) => {
                return (
                  <Grid item xs>
                    <Button key={index} color='secondary' variant='outlined' onClick={() => window.open(button.link)}>{button.buttonName}<Box width='10px'/><img src={button.buttonSRC}/></Button>
                    </Grid>
                )
            })}
            <Grid item xs>
              <IconButton variant='outlined' color='secondary' onClick={handleAddButtonOpen}><AddCircleOutlineIcon/></IconButton>
            </Grid>
            </Grid>
        </Grid>
    </Box>
    </Grid>
    <Grid item xs={5}>
        <Box height='90%'>
          <MapWrapped
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyDJ6IKajsU6APW7QlMx4i0MhCh0Ka0ppg0&v=3.exp&libraries=geometry,drawing,places"}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%`, borderRadius: '20px'}} />}
          />
          </Box>
    </Grid>
    <Grid item xs={3}>
    <Box>
    
        <Grid container direction='column' alignItems='center'>
            <Typography variant='h5'>Graduation Progression</Typography>
            <Box height='20px'/>
            {/*<PieChart id="pie"
              palette="Bright"
              dataSource={pieData}
              type="doughnut"
            >
            <Size width={300} height={300}/>
              <Legend
                orientation="vertical"
                itemTextPosition="right"
                horizontalAlignment="center"
                verticalAlignment="bottom" />
              <Series argumentField="title" valueField="completion">
              </Series>
              <PieTooltip enabled={true} customizeTooltip={customizeTooltip}/>
              
            </PieChart>
            <Typography variant='h4' style={{position: 'relative', top: '-210px', color: '#66C23C'}}>{piePercentage}%</Typography>*/}
            <CompletionChart />
        </Grid>
    </Box>
    </Grid>
    </Grid>
    </Box>

    </Grid>
    </Grid>
        <Box height='50px'></Box>
        <Grid item xs={5}>
        <Box>
            <Grid container direction='row' justifyContent='space-between' alignItems='baseline'>
            <Grid item xs={4} direction='column'>
            
                      <Box>
                        <Grid container direction='row' justifyContent='space-between'>
                          <Grid item xs={5}>
                            <Typography textAlign='left' variant='h5'>My Courses</Typography>
                          </Grid>
                          <Grid item xs={5}>
                            <Typography textAlign='right' color='text.sideText' variant='h6'>Overall Average: {currentAverage}%</Typography>
                          </Grid>
                        </Grid>
                        </Box>
                        <Box height='10px'></Box>
                        <DataGrid autoHeight
                            rows={rows}
                            columns={columnsCompleted}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            textColor={theme.palette.text.secondary}
                        />
<Box height='25px'></Box>
<Divider flexItem/>
<Box height='25px'></Box>
        <Grid item xs={1}>
          <Box width='650px'>
                <Grid container direction='column' justifyContent='space-between' alignItems='flex-start' spacing={2}>
                  <Grid item xs>
                    <Grid container direction='row' justifyContent='space-between' spacing={2}>
                      <Grid item xs><TextField sx={{width: '220px'}} InputProps={{readOnly: true}} value={`Overall Average: ${currentAverage}%`}></TextField></Grid>
                      <Grid item xs><TextField sx={{width: '220px'}} InputProps={{readOnly: true}} value={`Credits Completed: ${currentCredits.toFixed(1)}`}></TextField></Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                  {calcInputAmount.map((input, index) => {
                        if (input === calcInputAmount[calcInputAmount.length - 1]) {
                          return (
                            <Grid container direction='row'>
                            <Box width='500px'>
                            <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                                <Grid item xs={4}><TextField label='Course Name' id={`name${index}`} value={input.name} onChange={e => {changeNameValue(index, e)}}/></Grid>
                                <Grid item xs={3}><FormControl required>
                                  <InputLabel>Credits</InputLabel>
                                  <Select label='Credits' sx={{width:'120px', textAlign: 'left'}} key={`credit${index}`} id={`credit${index}`} value={input.credit} onChange={e => {changeCreditValue(index, e)}}>
                                    <MenuItem value={0.5}>0.5</MenuItem>
                                    <MenuItem value={1}>1.0</MenuItem>
                                  </Select>
                                </FormControl></Grid>
                                <Grid item xs={3}><TextField label='Grade' value={input.grade} inputProps={{type:'number'}} id={`grade${index}`} onInput = {(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                                    }} onChange={e => {changeGradeValue(index, e)}}/></Grid>
                                    <Grid item xs={1}><IconButton variant='outlined' color='secondary' onClick={() => handleDeleteCalc(index)}><RemoveCircleOutlineIcon/></IconButton></Grid>
                              </Grid>
                              </Box>
                              <IconButton variant='outlined' color='secondary' onClick={() => setCalcInputAmount([...calcInputAmount, {name: '', credit: '', grade: '', id: calcInputAmount[calcInputAmount.length-1].id+1}])}><AddCircleOutlineIcon/></IconButton>
                              </Grid>
                          )
                        } else {
                          return (
                            <Grid container direction='row'>
                            <Box width='500px'>
                            <Grid container direction='row' alignItems='center' justifyContent='space-between'>
                                <Grid item xs={4}><TextField label='Course Name' id={`name${index}`} value={input.name} onChange={e => {changeNameValue(index, e)}}/></Grid>
                                <Grid item xs={3}><FormControl required>
                                  <InputLabel>Credits</InputLabel>
                                  <Select label='Credits' sx={{width:'120px'}} key={`credit${index}`} id={`credit${index}`} value={input.credit} onChange={e => {changeCreditValue(index, e)}}>
                                    <MenuItem value={0.5}>0.5</MenuItem>
                                    <MenuItem value={1}>1.0</MenuItem>
                                  </Select>
                                </FormControl></Grid>
                                <Grid item xs={3}><TextField label='Grade' value={input.grade} inputProps={{type:'number'}} id={`grade${index}`} onInput = {(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                                    }} onChange={e => {changeGradeValue(index, e)}}/></Grid>
                                    <Grid item xs={1}><IconButton variant='outlined' color='secondary' onClick={() => handleDeleteCalc(index)}><RemoveCircleOutlineIcon/></IconButton></Grid>
                              </Grid>
                              </Box>
                              <IconButton variant='outlined' color='secondary' hidden disabled></IconButton>
                              </Grid>
                        )
                        }
                    })}
                    </Grid>
                    <Grid item xs>
                      <Button variant='outlined' sx={{width:'100px'}} onClick={useCalculator} color='secondary'>Calculate</Button>
                    </Grid>
                    <Grid item xs>
                    <TextField value={desiredAverage} onChange={(e) => changeDesiredAverage(e)} InputProps={{readOnly: true}} label='Calculated Average' onInput = {(e) => {
                                        e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                                    }}/>
                    </Grid>
                </Grid>
                </Box>
        </Grid>



                    </Grid>

                <Divider orientation='vertical' variant='middle' flexItem></Divider>
                <Grid item xs={7} direction='column'>
                <Typography textAlign='left' variant='h5'>Programs</Typography>
                <Box height='8px'/>
                  {programInfo.map((program, index) => {
                    let completedCredits = 0
                    let grade = 0;
                    for (let i=0; i < program.required.length; i++) {
                      for (let x=0; x<rows.length; x++) {
                        if (rows[x].id === program.required[i].id) {
                          completedCredits = completedCredits + program.required[i].credits
                          if (rows[x].credits === 0.5) {
                            grade = grade + rows[x].grade
                          } else {
                            grade = grade + (rows[x].grade*2)
                          }
                          
                        } else {
                          
                        }
                      }
                    }
                    let creditsRemaining = (program.totalCredits - completedCredits).toFixed(1)
                    let gradeAverage = (grade / (completedCredits*2)).toFixed(2)

                    return (
                    <Grid>
                    <Box>
                    <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                      <AccordionSummary expandIcon={<ExpandMore color='arrowIcons'/>}>
                        <Typography sx={{width: '50%', textAlign: 'left', lexShrink:0}} variant='h5'>{program.name}</Typography>
                        <Typography sx={{width: '50%', color: 'text.secondary', textAlign: 'right'}} variant='h6'>GPA: {gradeAverage}%  -  Remaining Credits: {creditsRemaining}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Grid container direction='row' justifyContent='space-between'>

                        <Grid item xs={5.5} direction='column'>
                            <Typography textAlign='left' variant='h5'>{program.technicalElectives ? 'Recommended Technical Electives' : 'Recommended General Electives'}</Typography>
                                <Box height='10px'></Box>
                                <DataGrid autoHeight
                                    rows={program.recommended}
                                    columns={columnsElectives}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    textColor={theme.palette.text.secondary}
                                />
                        </Grid>
                        <Grid item xs={5.5} direction='column'>
                          <Typography textAlign='left' variant='h5'>Required Courses</Typography>
                          <Box height='10px'></Box>
                          <DataGrid autoHeight
                              rows={program.required}
                              columns={columnsRequired}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                              sx={{color: 'text.primary.main'}}
                          />
                        </Grid>

                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                    </Box>
                    <Box height='10px'/>
                    </Grid>
                    )
                  })}
                    </Grid>





            </Grid>
        </Box>
              </Grid>

  </Grid>
  </Box>


</Container>

      
      </Box>
      
    </Box>

    <Dialog open={addButtonOpen} onClose={handleAddButtonClose}>
        <DialogTitle>Add a New Linked Button</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Link Name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(e) => {
                              setButtonName(e.target.value)
                            }}
          />
          <TextField
            margin="dense"
            id="URL"
            label="Website URL"
            type="url"
            fullWidth
            variant="standard"
            defaultValue="www."
            onChange={(e) => {
                              setButtonURL(e.target.value)
                            }}
          />
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleAddButtonClose}>Cancel</Button>
          <Button color='secondary' onClick={handleAddButtonAdd}>Add</Button>
        </DialogActions>
      </Dialog>


      {/*<Dialog open={chartInfoOpen} onClose={handleChartInfoClose}>
        <DialogTitle>Chart Information</DialogTitle>
        <DialogContent>
                    <Box height='150px' width='400px'>
                    <Grid container direction='column' alignItems='flex-start' justifyContent='space-evenly' height='110%'>
                            <Grid container direction='row' alignItems='center'>
                                <Box width='20px' height='20px' borderRadius='100px' backgroundColor='#229c22'></Box>
                                <Box width='10px'></Box>
                                <Typography variant='h7'>Courses Completed: {data[0].value}</Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center'>
                                <Box width='20px' height='20px' borderRadius='100px' backgroundColor='#fa8128'></Box>
                                <Box width='10px'></Box>
                                <Typography variant='h7'>Required Technical Courses: {data[1].value}</Typography>
                            </Grid>
                            <Grid container direction='row' alignItems='center'>
                                <Box width='20px' height='20px' borderRadius='100px' backgroundColor='#b90e0a'></Box>
                                <Box width='10px'></Box>
                                <Typography variant='h7'>Required Non-Technical Courses: {data[2].value}</Typography>
                            </Grid>
                    </Grid>
                </Box>
        </DialogContent>
        <DialogActions>
          <Button color='secondary' onClick={handleChartInfoClose}>Close</Button>
        </DialogActions>
      </Dialog>*/}
                            
    </div>
    </ThemeProvider>
  );
}