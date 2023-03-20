import './App.css';
import React from 'react';

import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from "./Home.js"

import Template from "./Template"
//Implement Control + C as a button bound.
import Forums from "./Forums"
import Tutors from "./Tutors"

import Calendar from './DrawerPages/Calendar';
import Help from './DrawerPages/Help';

import CourseHome from './Course/CourseHome';
import CourseConfig from './Course/CourseConfig';
import CourseLectures from './Course/CourseLectures';
import CourseLabs from './Course/CourseLabs';
import CourseTutorials from './Course/CourseTutorials';
import CourseAnnouncements from './Course/CourseAnnouncements';
import CourseAssignments from './Course/CourseAssignments';
import CourseExamination from './Course/CourseExamination';
import CourseGradebook from './Course/CourseGradebook';
import CourseSylabus from './Course/CourseSylabus';
import CourseResources from './Course/CourseResources'

import Gradebook from './Gradebook/Gradebook';
import Gradebook2 from './Gradebook/Gradebook2';
import Assignments from './Assignments';
import Profile from "./Profile"
import Account from "./Account"
import Dashboard from "./Dashboard"
import home from "./Home"

import BasicTabs from "./Pages/Announcement/announcement"
import Testing from "./Testing"
//changes
import Register from "./page/Register"
import Login from "./page/Login"
import Chat from "./page/Chat"
import SetAvatar from './chatBox/SetAvatar';
import { Announcement } from '@mui/icons-material';
function App() {



  return (

    <div className="App">

  <BrowserRouter>
  
  <Routes>
  <Route path ="/" element={<Home />} />
       <Route path='/chat' element={<Chat />} />
      
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/setAvatar" element={<SetAvatar />} />
      <Route path='/DrawerButton0' element={<Home/>} />
                  
     
     <Route path='/Home' component={home} />  
     <Route path='/DrawerButton1' element={<Announcement/>} />
                  
     <Route path='/Announcements' component={BasicTabs}/>  
     <Route path='/DrawerButton2' element={<Calendar/>} />
    <Route path='/Calendar' component={Calendar}/>  
    <Route path='/DrawerButton3' element={<Help />} />
    <Route path='/Help' component={Help}/> 
    <Route path='/Courses/:courseID' component={CourseHome}/>
     <Route path='/CourseConfig/:courseID' component={CourseConfig}/>
                <Route path='/Lectures/:courseID' component={CourseLectures}/>
                <Route path='/Tutorials/:courseID' component={CourseTutorials}/>
                <Route path='/Labs/:courseID' component={CourseLabs}/>

                <Route path='/Announcement/:courseID' component={CourseAnnouncements}/>
                <Route path='/Assignments/:courseID' component={CourseAssignments}/>
                <Route path='/Examination/:courseID' component={CourseExamination}/>
                <Route path='/Gradebook/:courseID' component={CourseGradebook}/>
                <Route path='/Sylabus/:courseID' component={CourseSylabus}/>
                <Route path='/Resources/:courseID' component={CourseResources}/>

                <Route path='/Assignments' component={Assignments}/>
                <Route path='/Forums' component={Forums}/>
                <Route path='/Tutors' component={Tutors}/>
                <Route path='/Gradebook' component={Gradebook}/>
                <Route path='/Gradebook2' component={Gradebook2}/>
                <Route path='/Profile' component={Profile}/>
                <Route path='/Account' component={Account}/>
                <Route path='/Dashboard' component={Dashboard}/>
                <Route path='/Testing' component={Testing}/>
     </Routes>
     
      
    </BrowserRouter>
    
      
    </div>
  );
}




export default App;
