import * as React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import 'react-tabs/style/react-tabs.css';
import FullTable from "./FullTable";
import Twilight from "./Twilight";
import TonightStaff from "./TonightStaff";


export default function HomeView(props) {
  const obsid = props.obsid;
  const classes = props.classes;

  return (

    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.type === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >

      <div className={classes.root}>
        <Grid container direction="row" justifyContent="center" alignItems="left">
          <Grid item xs>
            <div><TonightStaff /></div>
          </Grid>
        </Grid>

        <span>&nbsp;&nbsp;</span>

        <Grid container direction="row" justifyContent="center" alignItems="left">
          <Grid item xs>
            <div clasName={classes.UTclock}><Twilight /></div>
          </Grid>
        </Grid>

        <span>&nbsp;&nbsp;</span>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}><FullTable pilogin={props.pilogin} obsid={obsid} classes={classes}/></Paper>
          </Grid>
        </Grid>
      </div>
    </Box>

  );
}
