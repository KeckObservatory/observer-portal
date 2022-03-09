import React from 'react';
import IconButton from "@material-ui/core/IconButton";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import {calc_dates} from "./Utils";
import {api_call} from './Utils'

class Alerts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      url: "&cmd=getScheduleByUser&type=pi&obsid=" + props.obsid,
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
          error: error
        });
        }
      )
  }

  render() {
    const {error, isLoaded, items} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      var next_str = "No Alerts";
      var date_beyond = calc_dates(items)[0];

      if (date_beyond !== undefined && date_beyond.length !== 0) {
        next_str = "Observing Night: " + date_beyond[0].Date
      }

      // TODO add alert for Post-obs Comment
      // $this->db = mysql_connect($host,"poc","p0c3u6m1t");
      // use poc;  <- Database = poc,  table = poc
      // mysql> select LastMod from poc where SubmitterID='2003';
      // +---------------------+

      return (
        <div>
          <IconButton color="secondary">
            <NotificationsActiveIcon/>
          </IconButton>
          {next_str}
        </div>
      )
    }
  }
}

export default Alerts;
