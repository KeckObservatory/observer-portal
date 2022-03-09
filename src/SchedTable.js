import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import Box from '@material-ui/core/Box';
import TableScrollbar from 'react-table-scrollbar';

import {api_call, calc_dates} from "./Utils";
import {table_head} from "./Utils";
import {table_rows} from "./Utils";
import Grid from "@material-ui/core/Grid";

class SchedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      url: "cmd=getScheduleByUser&type=pi&obsid=" + props.obsid,
    };

  }
  componentDidMount() {
    api_call(this.state.url, "telSched")
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
      )
    }

    render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Schedule Information...</div>;
    } else {

      var dates = calc_dates(items)
      if (dates[0].length === 0 && dates[1].length === 0) {
        return (
          <Table size="small" aria-label="Schedule">
            <TableHead  className={this.props.classes.small_header}>
              <TableCell align={'left'} style={{width: '20%'}}>Your Scheduled is open for the Semester.</TableCell>
            </TableHead>
           </Table>
        )
      }

      var header = table_head(items[0], 'SchedId')

      if (this.props.small) {

        return (
          <Table size="small" aria-label="Schedule">
            <TableHead  className={this.props.classes.small_header}>
              <TableCell align={'left'} style={{width: '40%'}}>Observing Schedule</TableCell>
              <TableCell align={'left'} style={{width: '10%'}}></TableCell>
              <TableCell align={'left'} style={{width: '10%'}}></TableCell>
              <TableCell align={'left'} style={{width: '40%'}}></TableCell>
            </TableHead>
            <TableBody>
              <TableCell align={'left'} style={{width: '40%'}}>
                  {dates[0][0]['Date']} UT: {dates[0][0]['StartTime']} - {dates[0][0]['EndTime']}
              </TableCell>
              <TableCell align={'left'} style={{width: '10%'}}>
                {dates[0][0]['Account']}
              </TableCell>
              <TableCell align={'left'} style={{width: '10%'}}>
                {dates[0][0]['ProjCode']}
              </TableCell>
              <TableCell align={'left'} style={{width: '40%'}}>
                {dates[0][0]['Observers']}
              </TableCell>
            </TableBody>
          </Table>
        )
      }

      return (
        <Grid container spacing={3}>
          <Grid item xs={this.props.width}>
            <Box width="100%" bgcolor="grey.300" p={1} my={0.5}>
              <TableScrollbar rows={this.props.nrows}>
                <Table size="small" aria-label="Schedule">
                  {header}
                  <TableBody>
                    {table_rows(dates[0], 'SchedId')}
                    {table_rows(dates[1], 'SchedId')}
                  </TableBody>
                </Table>
              </TableScrollbar>
            </Box>
          </Grid>
        </Grid>

      )
      }
    }
}

export default SchedTable;
