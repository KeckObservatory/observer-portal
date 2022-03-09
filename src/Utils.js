import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from '@material-ui/core/TableHead';
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {ApiCore} from "./api/ApiCore";
import axios from 'axios';

import URLS_CONFIG from "./urls_config.live.json";



export function api_call(url, api) {

  const apiTasks = new ApiCore({
    getAll: true,
    url: url,
    api: api
  });

  return (
    apiTasks.getAll().then((res) => {
        return res;
    })
  )
}

export function today_date() {
  var today = new Date();
  var utcDay = today.getUTCDate();
  today.setDate(utcDay);

  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd ;

  return (today)
}
export function date_hst_until_morning() {
  var today = new Date();
  today.setHours(today.getHours() - 8);

  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd ;

  return (today)
}

export function current_yr() {
  var today = new Date();
  var yyyy = today.getFullYear();

  return (yyyy)
}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

export function table_head(table_obj, exclude) {
  return (
    <TableHead  style={{backgroundColor: '#539ee2', color: 'white'}}>
      {get_rows(table_obj, exclude, 1)}
    </TableHead>
  )
}

function get_rows(item, exclude, head){
  var rows = []

  Object.entries(item).map((key) => {
    if (key[0] !== exclude) {
      if (head === 0){
        rows.push(<TableCell align={'left'} style={{width: '8%'}}>{truncate(item[key[0]])}</TableCell>)
      } else {
        rows.push(<TableCell align={'left'}
                             style={{color: 'white', width: '8%'}}>{key[0]}</TableCell>)
      }
    }
  })

  return (
    rows
  )
}

export function table_rows(table_obj, exclude) {
  var rows = table_obj.map(item => (
    <TableRow>
      {get_rows(item, exclude, 0)}
    </TableRow>
  ))

  return (rows)
}

export function truncate(str) {
  if (str) {
    return str.length > 25 ? str.substring(0, 22) + "..." : str;
  }
}

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

export function CollapseTableRow(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
              </Typography>
              {row.data}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export function is_iterable(obj) {
    // checks for null and undefined
    if (obj == null) {
        return false;
    }
    return typeof obj[Symbol.iterator] === 'function';
}

export function calc_dates (items) {
    if (!is_iterable(items)) {
        return ([[], []])
    }
    var d2 = Date.parse(today_date());
    var dates_after = [];
    var dates_before = [];
    for (const val of items) {
        const d1 = Date.parse(val.Date);
        if (d1 >= d2) {
            dates_after.push(val);
        } else {
            dates_before.push(val);
        }
    }

    return ([dates_after, dates_before])
}

export function calc_dates_log(items) {
    if (!is_iterable(items)) {
        return ([[], []])
    }
    var d2 = Date.parse(today_date());

    var dates_after = [];
    var dates_before = [];
    for (const val of items) {

      const d1 = Date.parse('20' + val.Name.split("_", 1));

      if (d1 >= d2) {
          dates_after.push(val);
      } else {
          dates_before.push(val);
      }
    }

    return ([dates_after, dates_before])
}


export function check_authentication({set_userinfo}, {set_isloaded}) {
    const LOCAL_HOST = 'https://' + window.location.hostname;
    const userinfo_route = URLS_CONFIG.USERINFO;

    axios.request({
        url: `${LOCAL_HOST}${userinfo_route}`,
        method: "get",
        withCredentials: true,
    }).then(response => {
        const ip = response.headers["x-my-real-ip"]
        axios.request({
            url: `${LOCAL_HOST}${userinfo_route}`,
            method: "get",
            withCredentials: true,
            headers: {
                'X-My-Real-Ip': ip,
            },
        }).then(response => {
            set_isloaded(true);
            set_userinfo(response.data)
        }).catch(error => {
            set_isloaded(true)
            console.log(error)
        })
    }, [])
}


export function E(id) {
    return document.getElementById(id);
} // E

export const ColorLine = ({ color }) => (
  <hr
    style={{
      color: color,
      backgroundColor: color,
      height: 4
    }}
  />
);

export function add_zero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function get_browser() {
  var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if(/trident/i.test(M[1])){
    tem=/\brv[ :]+(\d+)/g.exec(ua) || [];
    return {name:'IE',version:(tem[1]||'')};
  }
  if(M[1]==='Chrome'){
    tem=ua.match(/\bOPR|Edge\/(\d+)/)
    if(tem!=null)   {return {name:'Opera', version:tem[1]};}
  }
  M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
  if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
  return {
    name: M[0],
    version: M[1]
  };
}
