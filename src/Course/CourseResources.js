import { styled, useTheme, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container'
import {
  BrowserRouter as Router,
  Switch,
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
import React, { useState, useEffect } from 'react'
import {Courses} from '../Entities/courses'




import NavbarCourses from '../NavBars/NavbarCourses';
import { Course } from '../Entities/course';
import NavbarNewFinal from '../NavBars/NavBarNewFinal';
import { Autocomplete, List, ListItem, Stack, TextField, Typography } from '@mui/material';
import CourseInstructorTable from './CourseInstructorsTable';
import { getRequiredCourses } from '../Gradebook/GradeBookEventSystem';
import {
  getRequiredCourse
} from "./CourseEventSystem"
import NavbarNewFinalCourses from '../NavBars/NavBarNewFinalCourses';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function CourseResources( {match} ) {
  const {
    params: {courseID}
  } = match;

  console.log(match)

  console.log(courseID)

  const [courseData, setCourseData] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    getRequiredCourse(courseID).then((data) => {
      setCourseData(data);
      setIsLoading(false)
    });
  },[courseID])

  let name;
  let prof;
  let lectures;
  let tutorials;
  let labs;

  console.log("TEST")

  if(!isLoading){
    console.log(courseData.courseCode)
    let course = new Course(courseData);
    console.log(course.getCode())
    
    let name = course.getCode().courseCode
    let prof = course.getCode().prof;
    let lectures = course.getCode().sectionProfs
    let tutorials = course.getCode().tutorialProfs  
    let labs = course.getCode().labProfs
  }

  let pages = ["Announcements", "Assignments", "Examination",  "Gradebook", "Sylabus", "Resources"]
 

  return (
    <React.Fragment>

      {!isLoading && (
        <>
          <Box sx={{ display: 'flex'}}>
          <CssBaseline />

          <NavbarNewFinalCourses courseData={courseData}/>

            <Box component="main" sx={{ flexGrow: 1, p: 1}}>
              <DrawerHeader />

              <List>

                <ListItem>
                    <Typography variant = "h4" >
                  {courseData.courseCode}
                    </Typography>
                </ListItem>

                <Divider/>

                <ListItem >
                    <Typography variant = "h3" >
                  Resources
                    </Typography>
                </ListItem>




        
                
            </List>
            
            </Box>
          </Box>

            
        </>
      )}
      
    </React.Fragment>
  );
}