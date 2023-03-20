import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Component } from 'react';
import { Accordion, AccordionSummary, Grid, Table, TableBody, TableHead } from '@mui/material';

import MuiAccordionDetails from '@mui/material/AccordionDetails';

import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const drawerWidth = 240;

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .025)',
}));

const LabelCells = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border:1, 
  }
  
}));

export class CourseInstructorTable extends Component {

  getTableHeader = (category) => {
    
    let headerName;
    let exists = false;
    switch(category){
      case 'Lectures':
        headerName = category;
        if(this.props.lectures.length > 0){exists = true}
        break;
      case 'Tutorials':
        headerName = category;
        if(this.props.tutorials.length > 0){exists = true}
        break;
      case 'Labs':
        headerName = category;
        if(this.props.labs.length > 0){exists = true}
        break;
    }

    if(exists){
      return(
        <TableHead>
            <TableRow >
                <LabelCells>{headerName}</LabelCells>
                
            </TableRow>
        </TableHead>
      )
    }else return(<></>)
  } 

  render(){


  return (
      
         <Table sx={{border:1, margin: 2 }}>

            {this.getTableHeader("Lectures")}

            <TableBody> 
            {this.props.lectures.map((item, index) => {
                {
                return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >Section: {item.split(":")[0]}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.split(":")[1]}</TableCell>
                    </TableRow>
				        
            )}  
            })}
            </TableBody>

            {this.getTableHeader("Tutorials")}

            <TableBody> 
            {this.props.tutorials.map((item, index) => {
                {
                return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >Section: {item.split(":")[0]}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.split(":")[1]}</TableCell>
                    </TableRow>
				        
            )}  
            })}
            </TableBody>

            {this.getTableHeader("Labs")}


            <TableBody> 
            {this.props.labs.map((item, index) => {
                {
                return (
                    <TableRow>
                      <TableCell sx={{border:1, borderColor: 'black'}} >Section: {item.split(":")[0]}</TableCell>
                      <TableCell sx={{border:1, borderColor: 'black'}} >{item.split(":")[1]}</TableCell>
                    </TableRow>
				        
            )}  
            })}
            </TableBody>
                
        </Table>
    
       
    
  );
}
 } export default CourseInstructorTable
