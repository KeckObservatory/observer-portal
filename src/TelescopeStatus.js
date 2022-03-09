import * as React from 'react';
import {api_call, date_hst_until_morning} from "./Utils";
import Grid from "@material-ui/core/Grid";

class TelInst extends React.Component {
  constructor(props) {
    super(props);

    const date_str = date_hst_until_morning();

    this.state = {
      error: null,
      isLoaded_insts: false,
      isLoaded_states: false,
      status: {},
      url_inst: "cmd=getSchedule&date=" + date_str,
      url_states: "cmd=getInstrumentReadyState&date=" + date_str + "&instr="
    };
  }

  chkDate() {
    let cur_date = date_hst_until_morning()
    if (cur_date != this.date_str) {
      this.date_str = cur_date;
      this.setState( {
        url_inst: "cmd=getSchedule&date=" + this.date_str,
        url_states: "cmd=getInstrumentReadyState&date=" + this.date_str + "&instr="
      })
    }
  }

  getData() {
    this.chkDate();

    api_call(this.state.url_inst, "telSched")
    .then(
      (result) => {
        this.setState({
          isLoaded_insts: true,
        })

        for (const sched_elem of result) {
          let url_str = this.state.url_states + sched_elem['Instrument'];
          if (sched_elem['TelNr'] == this.props.tel_nr) {
            this.getInstStatus(url_str, sched_elem)
          }
        }

        this.setState({
          isLoaded_states: true,
        })
      },
      (error) => {
        this.setState({
          isLoaded_inst: true,
          error
        });
      },
    )
  }

  getInstStatus(url_str, sched_elem) {
    api_call(url_str, "telSched")
    .then(
      (inst_states) => {

        const inst_status = {...this.state.status, [sched_elem['Instrument']]: inst_states['State']};
        const ordered_insts = Object.keys(inst_status).sort().reduce(
          (obj, key) => {
            obj[key] = inst_status[key];
            return obj;
          },
          {}
        );

        this.setState( {
          status: ordered_insts,
        })
      },
      (error) => {
        this.setState({
          isLoaded_states: true,
          error
        });
      },
    )
  }

  componentDidMount() {
    this.getData();

    this.interval = setInterval(() => {
      let dt = new Date();
      // console.log("checking inst status..." + dt.getHours() + ":" + dt.getMinutes());
      this.getData()
    }, 120000)

  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {error, isLoaded_states, isLoaded_insts, status} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded_states || !isLoaded_insts) {
      return <div>Loading Instrument Status...</div>;
    } else {
      return (
        <>
          {Object.entries(status).map(([inst, state]) =>
            <Grid container direction="row" justifyContent="center" alignItems="center">
              <Grid item xs> {inst} : {state} </Grid>
            </Grid>
          )}
        </>
      )
    }
  }
}

export default TelInst;
