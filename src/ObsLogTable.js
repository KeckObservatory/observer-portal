import React from 'react';
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import {api_call, table_head} from "./Utils";
import {calc_dates_log} from "./Utils";
import TableScrollbar from 'react-table-scrollbar';
import Box from "@material-ui/core/Box";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import URLS_CONFIG from "./urls_config.live.json";


class ObsLogTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      url: "cmd=getObsLogTitle&json=True&obsid=" + props.obsid
    };
  }

  componentDidMount() {
    api_call(this.state.url, "proposal")
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
      return <div>Loading Observation Log Information...</div>;
    } else {
      if (!(items.data) || !("ObsLogTitle" in items.data)) {
        return (
          <Table size="small" aria-label="Schedule">
            <TableHead  className={this.props.classes.small_header}>
              <TableCell align={'left'} style={{width: '20%'}}>No Observing Logs Found.</TableCell>
            </TableHead>
          </Table>
        )
      }

      var tab_info = items.data['ObsLogTitle'].reverse()
      var obslogs = calc_dates_log(tab_info)
      var obslog_url = this.props.pilogin + URLS_CONFIG.OBSLOG

      if (this.props.small) {
        return (
          <Table size="small" aria-label="ObsLog">
            <TableHead  className={this.props.classes.small_header}>
              <TableCell align={'left'} style={{width: '30%'}}>Last Observing Log</TableCell>
              <TableCell align={'left'} style={{width: '50%'}}></TableCell>
              <TableCell align={'left'} style={{width: '20%'}}></TableCell>
            </TableHead>
            <TableBody>
            <TableRow>
              <TableCell align={'left'} style={{width: '30%'}}  component="a"
                         href={obslog_url + "?obslog=" + obslogs[1][1]['Name']}
                         target="_blank">{obslogs[1][1]['Name']}</TableCell>
              <TableCell align={'left'} style={{width: '50%'}}>{obslogs[1][1]['Title']}</TableCell>
              <TableCell align={'left'} style={{width: '20%'}}>{obslogs[1][1]['Semester']}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        )
      }
      return (
        <Box width="100%" bgcolor="grey.300" p={1} my={0.5}>
        <TableScrollbar rows={this.props.nrows}>
          <Table size="small" aria-label="Schedule">
            {table_head(tab_info[0])}
            <TableBody>
              {Object.entries(obslogs[1]).map(item => (
              <TableRow>
                <TableCell align={'left'} style={{width: '30%'}}  component="a"
                           href={obslog_url + "?obslog=" + item[1]['Name']}
                           target="_blank">{item[1]['Name']}
                </TableCell>
                <TableCell align={'left'} style={{width: '10%'}}>{item[1]['Semester']}</TableCell>
                <TableCell align={'left'} style={{width: '60%'}}>{item[1]['Title']}</TableCell>
              </TableRow>
              ) ) }
            </TableBody>
          </Table>
        </TableScrollbar>
        </Box>
      )
    }
  }
}

export default ObsLogTable;
