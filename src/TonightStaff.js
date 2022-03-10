import * as React from 'react';
import {api_call, date_hst_until_morning, ColorLine} from "./Utils";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import TelInst from "./TelescopeStatus";


class TonightStaff extends React.Component {
  constructor(props) {
    super(props);

    let date_str = date_hst_until_morning()

    this.state = {
      error: null,
      isLoaded1: false,
      isLoaded2: false,

      // staff: [{"TelNr": 1, "Type": "oa", "LastName": "None", "FirstName": "None"},
      //         {"TelNr": 2, "Type": "oa", "LastName": "None", "FirstName": "None"},
      //         {"TelNr": 1, "Type": "sa", "LastName": "None", "FirstName": "None"},
      //         {"TelNr": 2, "Type": "sa", "LastName": "None", "FirstName": "None"}],
      // instrument: [],
      // contact: [],

      staff: [],
      instrument: [],
      contact: [],

      url1: "cmd=getNightStaff&date=" + date_str,
      // url2: "cmd=getNightStaff&date=" + date_str,
      url2: "cmd=getEmployee",
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

    const {error, isLoaded1, isLoaded2, staff, contact} = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded1 || !isLoaded2) {
      return <div>Loading Proposal Information...</div>;
    } else {

      if (staff.constructor.name !== "Array" || contact.constructor.name !== "Array")
      {
        return (<div> </div>)
      }


      let staff_indx = {sa_keck2: 1, sa_keck1: 1, oa_keck1: 1, oa_keck2: 1}
      let contact_indx = {sa_keck2: 1, sa_keck1: 1}

      for (let i = 0; i < staff.length; i++) {
        if (staff[i]["Type"] === "sa") {
          if (staff[i]["TelNr"] === "1") {
            staff_indx.sa_keck1 = i;
          } else {
            staff_indx.sa_keck2 = i;
          }
        } else if (staff[i]["Type"] === "oa" || staff[i]["Type"] === "oar") {
          if (staff[i]["TelNr"] === "1") {
            staff_indx.oa_keck1 = i;
          } else {
            staff_indx.oa_keck2 = i;
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

      return (
      <>
        <Box >

          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs>
              Keck I
            </Grid>
            <Grid item xs>
              Keck II
            </Grid>
          </Grid>
          <ColorLine color="black" />

          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs>
              <div> SA: {staff[staff_indx.sa_keck1]['FirstName'] + " " + staff[staff_indx.sa_keck1]['LastName']} </div>
            </Grid>
            <Grid item xs>
              <div> {contact[contact_indx.sa_keck1]['CellPhone'] + " Cell"}</div>
              <div> {"808-885-" +  contact[contact_indx.sa_keck1]['OfficePhone'] + " Off."}</div>
            </Grid>
            <Grid item xs>
              <div> SA: {staff[staff_indx.sa_keck2]['FirstName'] + " " + staff[staff_indx.sa_keck2]['LastName']} </div>
            </Grid>
            <Grid item xs>
              <div> {contact[contact_indx.sa_keck2]['CellPhone'] + " Cell"}</div>
              <div> {"808-885-" +  contact[contact_indx.sa_keck2]['OfficePhone']  + " Off."}</div>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="center" alignItems="center">
            <Grid item xs>
              <div> OA: {staff[staff_indx.oa_keck1]['FirstName'] + " " + staff[staff_indx.oa_keck1]['LastName']} </div>
            </Grid>
            <Grid item xs>
              <div> 808-935-3714 MK </div>
              <div> 808-885-3878 HQ </div>
            </Grid>
            <Grid item xs>
              <div> OA: {staff[staff_indx.oa_keck2]['FirstName'] + " " + staff[staff_indx.oa_keck2]['LastName']} </div>
            </Grid>
            <Grid item xs>
              <div> 808-935-3729 MK </div>
              <div> 808-885-3885 HQ </div>
            </Grid>
          </Grid>

          <ColorLine color="black" />

          <Grid container direction="row" justifyContent="center" alignItems="center">

            <Grid item xs>
              <TelInst tel_nr="1"/>
            </Grid>
            <Grid item xs>
              <TelInst tel_nr="2"/>
            </Grid>
          </Grid>

        </Box>
      </>
      )
    }
  }
}

export default TonightStaff;
