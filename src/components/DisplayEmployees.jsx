import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/* HERE I AM DISPLAY THE EMPLOYEE DETAIL IN THE FORM OT TABLES */

export  function DisplayEmployees(props) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">First Name</TableCell>
            <TableCell align="left">Last Name</TableCell>
            <TableCell align="left">Mobile Number</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">City</TableCell>
            <TableCell align="left">Country</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {/* HERE I AM GETTING DATA FROM THE JSON SERVER DB.JSON I AM LOOP OVER THE DATA
              AND DISPLAY BELOW */}
            {props.data.map(e=><TableRow key={e.id}>
               
              <TableCell align="left">{e.firstname}</TableCell>
              <TableCell align="left">{e.lastname}</TableCell>
              <TableCell align="left">{e.phone}</TableCell>
              <TableCell align="left">{e.email}</TableCell>
              <TableCell align="left">{e.address}</TableCell>
              <TableCell align="left">{e.city}</TableCell>
              <TableCell align="left">{e.country}</TableCell>
             
            </TableRow>)
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
