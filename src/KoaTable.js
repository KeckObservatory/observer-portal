import React from 'react';
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import {api_call, table_rows} from "./Utils";
import TableScrollbar from 'react-table-scrollbar';
import Box from "@material-ui/core/Box";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";


class KoaTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      url: "pykoa=ALL&progid=" + props.obsid
    };
  }

  componentDidMount() {
    api_call(this.state.url, "koarti")
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
      return <div>Loading KOA Data...</div>;
    } else {

      if (!(items.data)){
        return (
          <Table size="small" aria-label="Schedule">
            <TableHead  className={this.props.classes.small_header}>
              <TableCell align={'left'} style={{width: '20%'}}>No Koa Data Found.</TableCell>
            </TableHead>
          </Table>
        )
      }

      var table_info = items.data.reverse()
      var head_style = this.props.classes.big_header

      if (this.props.small) {
        head_style = this.props.classes.small_header
      }

      return (
        <Box width="100%" bgcolor="grey.300" >
        <TableScrollbar rows={this.props.nrows}>
          <Table size="small" aria-label="Schedule">
            <TableHead  className={head_style}>
              <TableCell align={'left'} style={{width: '25%'}}>KOA Data</TableCell>
              <TableCell align={'left'} style={{width: '25%'}}>ID</TableCell>
              <TableCell align={'left'} style={{width: '25%'}}>Instrument</TableCell>
              <TableCell align={'left'} style={{width: '25%'}}>RA</TableCell>
              <TableCell align={'left'} style={{width: '25%'}}>DEC</TableCell>
              <TableCell align={'left'} style={{width: '25%'}}>Equinox</TableCell>
              <TableCell align={'left'} style={{width: '25%'}}>AM</TableCell>
              <TableCell align={'left'} style={{width: '25%'}}>Type</TableCell>
            </TableHead>
            <TableBody>
              {table_rows(table_info)}
            </TableBody>

          </Table>
        </TableScrollbar>
        </Box>
        )
      }
    }
}

export default KoaTable;
