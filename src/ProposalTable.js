import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import {api_call, current_yr, table_head, table_rows} from "./Utils";
import TableScrollbar from 'react-table-scrollbar';
import TableHead from "@material-ui/core/TableHead";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TableCell from "@material-ui/core/TableCell";
import Iframe from "./iframe"
import URLS_CONFIG from "./urls_config.live.json"

const poc_src = URLS_CONFIG.PROPOSAL_APPLY_SRC

class PropTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        error: null,
        isLoaded: false,
        items: [],
        url: "cmd=getAllProposals&json=True&obsid=" + props.obsid
    };
  }

  componentDidMount() {
    api_call(this.state.url, "proposal")
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result,
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
      return <div>Loading Proposal Information...</div>;
    } else {
      if (!(items.data) || !("AllProposals" in items.data)) {

        if (this.props.entry_form) {
          return (
            <Iframe source={poc_src} classes={this.props.classes} bg_color='#FFFDD0'/>
            )
        } else {
          return (
          <Table size="small" aria-label="Schedule">
            <TableHead  className={this.props.classes.small_header}>
              <TableCell align={'left'} style={{width: '20%'}}>No Proposals Found.</TableCell>
            </TableHead>
          </Table>
          )
        }
      }

      var tab_info = items.data['AllProposals'].reverse()

      if (this.props.small) {
        var current_proposals = []
        const yr = current_yr()
        Object.entries(tab_info).map((vals) => {
          if (vals[1]['KTN'].includes(yr)) {
            current_proposals.push(vals)
          }
        })

        if (current_proposals.length === 0) {
          if (this.props.entry_form) {
            return (
              <Iframe source={poc_src} classes={this.props.classes} bg_color='#FFFDD0'/>
            )
          } else {
            return (
              <Table size="small" aria-label="Schedule">
                <TableHead> No Proposals Found. </TableHead>
              </Table>
            )
          }
        }

        var nprops = current_proposals.length + 2;
        var nrows = 10;
        if (nprops < nrows){
          nrows = nprops;
        }
        return (

          <TableScrollbar rows={nrows}>
          <Table size="small" aria-label="Proposals">
            <TableHead  className={this.props.classes.small_header}>
              <TableCell align={'left'} style={{width: '30%'}}>Current Proposals</TableCell>
              <TableCell align={'left'} style={{width: '60%'}}></TableCell>
              <TableCell align={'left'} style={{width: '10%'}}></TableCell>
            </TableHead>
            <TableBody>
              {current_proposals.map((vals) => (
                <TableRow>
                  <TableCell align={'left'} style={{width: '30%'}}>{vals[1]['KTN']}</TableCell>
                  <TableCell align={'left'} style={{width: '60%'}}>{vals[1]['ProgramTitle']}</TableCell>
                  <TableCell align={'left'} style={{width: '10%'}}>{vals[1]['ProgramType']}</TableCell>
                </TableRow>
                )
              )}
            </TableBody>
          </Table>
          </TableScrollbar>
        )
      }
      return (
        <Grid container spacing={3}>
          <Grid item xs={this.props.width}>
            <Box width="100%" bgcolor="grey.300" p={1} my={0.5}>
            <TableScrollbar rows={this.props.nrows}>
              <Table size="small" aria-label="Proposals" >
                {table_head(tab_info[0])}
                <TableBody>
                  {table_rows(tab_info)}
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

export default PropTable;
