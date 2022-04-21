import * as React from 'react';
import {api_call, date_hst_until_morning, ColorLine} from "./Utils";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import TelInst from "./TelescopeStatus";
import InstrStatus from "./InstrumentStatus";


class TonightStaff extends React.Component {
  constructor(props) {
    super(props);

    let date_str = date_hst_until_morning()

    this.state = {
      obsid: props.obsid,
      error: null,
      isLoaded1: false,
      isLoaded2: false,
      isLoaded3: false,

      // staff: [{"TelNr": 1, "Type": "oa", "LastName": "None", "FirstName": "None"},
      //         {"TelNr": 2, "Type": "oa", "LastName": "None", "FirstName": "None"},
      //         {"TelNr": 1, "Type": "sa", "LastName": "None", "FirstName": "None"},
      //         {"TelNr": 2, "Type": "sa", "LastName": "None", "FirstName": "None"}],
      // instrument: [],
      // contact: [],

      staff: [],
      instrument: [],
      contact: [],
      schedule: [],

      url1: "cmd=getNightStaff&date=" + date_str,
      // url2: "cmd=getNightStaff&date=" + date_str,
      url2: "cmd=getEmployee",
      url3: "cmd=getSchedule&date=" + date_str,

    };
  }

  chkDate() {
    let cur_date = date_hst_until_morning()
    if (cur_date != this.date_str) {
      this.date_str = cur_date;
      this.setState( {
        url1: "cmd=getNightStaff&date=" + this.date_str,
      })
      this.getData();
    }
  }

  getData() {
    api_call(this.state.url1, "telSched")
    .then(
      (result) => {
        this.setState({
          isLoaded1: true,
          staff: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded1: true,
          error
        });
      },
    )

    api_call(this.state.url2, "telSched")
    .then(
      (result) => {
        this.setState({
          isLoaded2: true,
          contact: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded2: true,
          error
        });
      },
    )

    api_call(this.state.url3, "telSched")
    .then(
      (result) => {
        this.setState({
          isLoaded3: true,
          schedule: result,
        });
      },
      (error) => {
        this.setState({
          isLoaded3: true,
          error
        });
      },
    )
  }
  componentDidMount() {
    this.getData()
    this.interval = setInterval(() => {
      let dt = new Date();
      this.chkDate();
    }, 300000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {

    const {obsid, error, isLoaded1, isLoaded2, isLoaded3, staff, contact, schedule} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded1 || !isLoaded2) {
      return <div>Loading Proposal Information...</div>;
    } else {

      if (staff.constructor.name !== "Array" || contact.constructor.name !== "Array")
      {
        return (<div> </div>)
      }


      let staff_indx = {sa_keck2: 1, sa_keck1: 1, oa_keck1: 1, oa_keck2: 1, oa_phone1: 1, oa_phone2: 1}
      let contact_indx = {sa_keck2: 1, sa_keck1: 1}

      for (let i = 0; i < staff.length; i++) {
        if (staff[i]["Type"] === "sa" || staff[i]["Type"] === "saoc") {
          if (staff[i]["TelNr"] === "1") {
            staff_indx.sa_keck1 = i;
          } else {
            staff_indx.sa_keck2 = i;
          }
        } else if (staff[i]["Type"] === "oa" || staff[i]["Type"] === "oar") {
          if (staff[i]["TelNr"] === "1") {
            staff_indx.oa_keck1 = i;
            if (staff[i]["Type"] == "oa") {
              staff_indx.oa_phone1 = "808-935-3714 SU";
            }
            else {
              staff_indx.oa_phone1 = "808-885-3787 HQ";
            }
          } else {
            staff_indx.oa_keck2 = i;
            if (staff[i]["Type"] == "oa") {
              staff_indx.oa_phone2 = "808-935-3729 SU";
            }
            else {
              staff_indx.oa_phone1 = "808-885-3885 HQ";
            }
          }
        }
      }

      for (let i = 0; i < contact.length; i++) {
        if (contact[i]["LastName"] === staff[staff_indx.sa_keck1]['LastName'] &&
            contact[i]["FirstName"] === staff[staff_indx.sa_keck1]['FirstName']) {
          contact_indx.sa_keck1 = i;
        } else if (contact[i]["LastName"] === staff[staff_indx.sa_keck2]['LastName'] &&
                   contact[i]["FirstName"] === staff[staff_indx.sa_keck2]['FirstName']) {
          contact_indx.sa_keck2 = i;
        }
      }

      let isScheduled = false;
      for (let i = 0 ; i < schedule.length ; i++) {
        if (schedule[i]['ObsId'].includes(obsid) || schedule[i]['PiId'] === obsid) {
            isScheduled = true;
        }
      }

      return (
      <>
        <Box>
          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs style={{paddingTop: "24px", fontSize: 18, fontWeight: 'bold'}}>
              Keck I
            </Grid>
            <Grid item xs style={{paddingTop: "24px", fontSize: 18, fontWeight: 'bold'}}>
              Keck II
            </Grid>
          </Grid>

          {/* Show instrument status if isScheduled, else show instrument availability */}
          {isScheduled ? (
          <Grid container direction="row" justifyContent="center" alignItems="top">

            <Grid item xs>
              <TelInst tel_nr="1"/>
            </Grid>
            <Grid item xs>
              <TelInst tel_nr="2"/>
            </Grid>
          </Grid>
          ) : (
          <Grid container direction="row" justifyContent="center" alignItems="top">
            <Grid item xs>
              <InstrStatus tel_nr="1"/>
            </Grid>
            <Grid item xs>
              <InstrStatus tel_nr="2"/>
            </Grid>
          </Grid>
          )}

          <div style={{ padding: 20 }}></div>

          {isScheduled &&
          <Grid container direction="row" justifyContent="left" alignItems="left">
            <Grid item xs style={{fontWeight: 'bold'}}>Observing Assistant</Grid>
            <Grid item xs style={{fontWeight: 'bold'}}>Staff Astronomer</Grid>
            <Grid item xs style={{fontWeight: 'bold'}}>Observing Assistant</Grid>
            <Grid item xs style={{fontWeight: 'bold'}}>Staff Astronomer</Grid>
          </Grid>
          }
          {isScheduled &&
          <Grid container direction="row" justifyContent="left" alignItems="left">
            <Grid item xs>
              <div>{staff[staff_indx.oa_keck1]['FirstName'] + " " + staff[staff_indx.oa_keck1]['LastName']}</div>
            </Grid>
            <Grid item xs>
              <div>{staff[staff_indx.sa_keck1]['FirstName'] + " " + staff[staff_indx.sa_keck1]['LastName']}</div>
            </Grid>
            <Grid item xs>
              <div>{staff[staff_indx.oa_keck2]['FirstName'] + " " + staff[staff_indx.oa_keck2]['LastName']}</div>
            </Grid>
            <Grid item xs>
              <div>{staff[staff_indx.sa_keck2]['FirstName'] + " " + staff[staff_indx.sa_keck2]['LastName']}</div>
            </Grid>
          </Grid>
          }
          {isScheduled &&
          <Grid container direction="row" justifyContent="left" alignItems="left">
            <Grid item xs>
              <div>{staff_indx.oa_phone1}</div>
            </Grid>
            <Grid item xs>
              <div>{contact[contact_indx.sa_keck1]['CellPhone'] + " Cell"}</div>
            </Grid>
            <Grid item xs>
              <div>{staff_indx.oa_phone2}</div>
            </Grid>
            <Grid item xs>
              <div>{contact[contact_indx.sa_keck2]['CellPhone'] + " Cell"}</div>
            </Grid>
          </Grid>
          }

        </Box>
      </>
      )
    }
  }
}

export default TonightStaff;
