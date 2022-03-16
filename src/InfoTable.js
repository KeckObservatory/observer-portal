import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Box from "@material-ui/core/Box";


export function InfoTable(props) {
  const userinfo = props.userinfo
  const classes = props.userinfo

  return (

    <Box width="100%" bgcolor="grey.300" >
      <Table size="small" aria-label="Schedule">
        <TableBody>
          <TableRow>
            <TableCell className={classes.infoCell}>Name:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Title} {userinfo.FirstName} {userinfo.LastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Category:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Category}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Username:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Email:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Email}</TableCell>
          </TableRow>
{/*
          <TableRow>
            <TableCell className={classes.infoCell}>KOA ID:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Id}</TableCell>
          </TableRow>
*/}
          <TableRow>
            <TableCell className={classes.infoCell}>Affiliation:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Affiliation}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Institute:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.AllocInst}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Address:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Street}<br></br>
                {userinfo.City}  {userinfo.State} {userinfo.Zip} <br></br>  {userinfo.Country}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Phone:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Website:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.url}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Interests:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.Interests}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.infoCell}>Work Area:</TableCell>
            <TableCell className={classes.infoCell}>{userinfo.WorkArea}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  )
}

export default InfoTable;
