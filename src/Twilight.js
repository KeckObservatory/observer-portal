import * as React from 'react';
import {api_call, today_date, add_zero} from "./Utils";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import UTclock from "./Clock";

class Twilight extends React.Component {
  constructor(props) {
    super(props);

    this.sky_blue = '#4f53a2';
    this.sunset_red = '#F0445E';
    this.twilight_purple = '#775f81';
    this.dark_time = '#191919';
    this.moon_grey = '#737373';

    this.state = {
      error: null,
      isLoaded: false,
      url: "date=" + today_date(),
      times: []
    };
  }

  sky_color(tm){
    var hr_str = add_zero(new Date().getUTCHours());
    var min_str = add_zero(new Date().getUTCMinutes());
    var current_date = hr_str + ':' + min_str

    let col = this.sky_blue;

    if (tm[0]["moonrise"] === 'None') {
      tm[0]["moonrise"] = tm[0]["sunrise"]
    }

    if (current_date > tm[0]["sunrise"] || current_date < tm[0]["sunset"]) {
      col = this.sky_blue;
    }
    else if (current_date >= tm[0]["sunset"] && current_date < tm[0]["dusk_12deg"]) {
      col = this.sunset_red;
    }
    else if (current_date >= tm[0]["dusk_12deg"] && current_date <= tm[0]["dusk_18deg"]) {
      col = this.twilight_purple;
    }
    else if (current_date > tm[0]["dusk_18deg"] && current_date < tm[0]["dawn_18deg"]) {
      if (current_date < tm[0]["moonrise"]) {
        col = this.dark_time;
      } else {
        col = this.moon_grey;
      }
    }
    else if (current_date >= tm[0]["dawn_18deg"] && current_date < tm[0]["dawn_12deg"]) {
      col = this.twilight_purple;
    }
    else if (current_date >= tm[0]["dawn_12deg"]) {
      col = this.sunset_red;
    }

    return col;
  }

  componentDidMount() {
    api_call(this.state.url, "metrics")
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          times: result,
          box_color: this.sky_color(result)
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      },
    )
    this.interval = setInterval(() => {
      this.setState({
        box_color: this.sky_color(this.state.times)
      })
    }, 120000)
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  render() {

    const {error, isLoaded, times} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading Proposal Information...</div>;
    } else {
      if (!(times)) { return (<div></div>)}

      return (
      <>
        <Box>
          <Grid container direction="row" justifyContent="center" alignItems="top">
            <Grid item xs>
              <div> <UTclock zone={'Etc/GMT'} fmt={'YYYY-MM-DD HH:mm:ss'}/> UT&nbsp; </div>
              <div> <UTclock zone={'Pacific/Honolulu'} fmt={'YYYY-MM-DD HH:mm:ss'}/> HST</div>
            </Grid>
            <Grid item xs>
              <div> Sunset: {times[0]["sunset"]} UT</div>
              <div> Sunrise: {times[0]["sunrise"]} UT</div>
            </Grid>
            <Grid item xs>
              <div> 12-deg: {times[0]["dusk_12deg"]} UT</div>
              <div> Mid-Point: {times[0]["midpoint"]} UT</div>
              <div> 12-deg: {times[0]["dawn_12deg"]} UT</div>
            </Grid>
            <Grid item xs>
              <div> 18-deg: {times[0]["dusk_18deg"]} UT</div>
              <div> 18-deg: {times[0]["dawn_18deg"]} UT</div>
            </Grid>
            <Grid item xs>
              <div> Moonrise: {times[0]["moonrise"]} </div>
              <div> Moonset: {times[0]["moonset"]} </div>
              <div> Illumination: {times[0]["moonillumination"]} </div>
            </Grid>
          </Grid>
        </Box>
      </>
      )
    }
  }
}

export default Twilight;
