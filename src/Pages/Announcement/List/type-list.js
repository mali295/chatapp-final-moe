import * as React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { getAllEvents } from '../../../core/services/eventService';

export default function BasicTable(props) {

    const [rows,setRows]=React.useState([]);

    useEffect( () => {
        getAllEvents(props.data).then(res=>{
            setRows(res.data);
            console.log(rows);
        });
      },[props.data,props.ignored]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
       {rows.length>0 &&  <TableHead>
          <TableRow>
            <TableCell>Grade Name</TableCell>
            <TableCell align="right">Grade</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Due Date</TableCell>
          </TableRow>
        </TableHead>}
        <TableBody>
          {rows.length>0 && rows.map((row) => (
            <TableRow
              key={row.gradeName}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.gradeName}
              </TableCell>
              <TableCell align="right">{row.grade}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}