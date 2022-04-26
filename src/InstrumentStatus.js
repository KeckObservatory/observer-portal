import * as React from 'react';
import {api_call, date_hst_until_morning} from "./Utils";
import Grid from "@material-ui/core/Grid";
import Check from "@material-ui/icons/Check";

class InstrStatus extends React.Component {
  constructor(props) {
    super(props);

    const date_str = date_hst_until_morning();

    this.state = {
      error: null,
      isLoaded_inst: false,
      status: {},
      url_inst: "cmd=getInstrumentStatus&date=" + date_str + "&telnr=" + this.props.tel_nr,
    };
  }

  chkDate() {
    let cur_date = date_hst_until_morning()
    if (cur_date != this.date_str) {
      this.date_str = cur_date;
      this.setState( {
        url_inst: "cmd=getInstrumentStatus&date=" + this.date_str + "&telnr=" + this.props.tel_nr
      })
    }
  }

  getData() {
    this.chkDate();

    api_call(this.state.url_inst, "telSched")
    .then(
      (result) => {
        this.setState({
          status: result,
          isLoaded_inst: true,
        })

//        this.getInstAvail(this.state.url_inst)
//        for (const [instr, entry] of result[0]) {
//          result[0][instr]['Available'] = 'Not Available'
//          if (entry['Available'] == 1) {
//              result[0][instr]['Available'] = 'Available'
//          let url_str = this.state.url_states + sched_elem['Instrument'];
//          if (sched_elem['TelNr'] == this.props.tel_nr) {
//            this.getInstStatus(url_str, sched_elem)
//          }
//        }

      },
      (error) => {
        this.setState({
          isLoaded_inst: true,
          error
        });
      },
    )
  }

//  getInstAvail(url_str) {
//    api_call(url_str, "telSched")
//    .then(
//      (result) => {
////
////        const inst_status = {...this.state.status, [sched_elem['Instrument']]: inst_states['State']};
////        const ordered_insts = Object.keys(inst_status).sort().reduce(
////          (obj, key) => {
////            obj[key] = inst_status[key];
////            return obj;
////          },
////          {}
////        );
//
//        this.setState( {
//          status: result,
////          status: ordered_insts,
//        })
//      },
//      (error) => {
//        this.setState({
//          isLoaded_states: true,
//          error
//        });
//      },
//    )
//  }

  componentDidMount() {
    this.getData();
//
//    this.interval = setInterval(() => {
//      let dt = new Date();
//      // console.log("checking inst status..." + dt.getHours() + ":" + dt.getMinutes());
//      this.getData()
//    }, 120000)
//
  }

//  componentWillUnmount() {
//    clearInterval(this.interval);
//  }

  render() {
    const {error, isLoaded_states, isLoaded_inst, status} = this.state;

    const available = ['Not Available', 'TDA Ready', 'Scheduled'];
    const colors = ['#F9C2C2', '#D2EEB9'];
    const icon = ['', <Check color="success" fontSize="small" valign="bottom"/>];

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded_inst) {
      return <div>Loading Instrument Availability...</div>;
    } else {
      return (
        <>
          {Object.entries(status[0]).map(([instr, item]) =>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2}>
              <Grid item xs={2}
                         style={{color: 'black', backgroundColor: colors[item.Available]}}
                         align="left">
                         {instr}
              </Grid>
              <Grid item xs={2}
                         style={{color: 'black', backgroundColor: colors[item.Available]}}
                         align="left">
                         {available[item.Available+item.Scheduled]}
              </Grid>
              <Grid item xs={1} align="left">
                         {icon[item.Available]}
              </Grid>
            </Grid>
          )}
        </>
      )
    }
  }
}

export default InstrStatus;
