import React from 'react';
import Box from '@material-ui/core/Box';

import SchedTable from "./SchedTable";
// import KoaTable from "./KoaTable";
import ObsLogTable from "./ObsLogTable";
import PropTable from "./ProposalTable";

class FullTable extends React.Component {

  render() {
    return (
      <>
        <Box width="100%" bgcolor="grey.300" p={1} my={0.5}>
          <SchedTable obsid={this.props.obsid}  classes={this.props.classes} nrows={2} small={true}/>
          <ObsLogTable pilogin={this.props.pilogin} obsid={this.props.obsid} classes={this.props.classes} nrows={2} small={true}/>
          <PropTable obsid={this.props.obsid}  classes={this.props.classes} small={true}/>
          {/*<KoaTable obsid={this.props.obsid} classes={this.props.classes} nrows={3} small={true}/>*/}
        </Box>
      </>
    )
  }
}

export default FullTable;
