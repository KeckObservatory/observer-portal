import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FlareOutlinedIcon from '@material-ui/icons/FlareOutlined';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import URLS_CONFIG from "./urls_config.live.json";
import Iframe from "./iframe";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      fontSize: '10em',
      width: '100%',
      maxWidth: 360,
      height: '80vh', // -60 for ToolBarIcon height
      backgroundColor: theme.palette.background.paper,
    },
    mainList:{
      fontSize: 14,
    },
    subList:{
      fontSize: 12,
      textAlign: 'left',
      textIndent: '20px'
    },
  }),
);

export default function NestedList(props) {
  const classes = useStyles();

  const [openObs, setOpenObs] = React.useState(false);
  const [openPreObs, setOpenPreObs] = React.useState(false);
  const [openPostObs, setOpenPostObs] = React.useState(false);
  const [openResources, setOpenResources] = React.useState(false);
  const [openSettings, setOpenSettings] = React.useState(false);

  const click_obs = () => {
    setOpenObs(!openObs);
  };
  const click_pre_obs = () => {
    setOpenPreObs(!openPreObs);
  };
  const click_post_obs = () => {
    setOpenPostObs(!openPostObs);
  };
  const click_resources = () => {
    setOpenResources(!openResources);
  };
  const click_settings = () => {
    setOpenSettings(!openSettings);
  };
  const handlePageClick = (val) => {
    props.setPageName(val)
  };

  return (
    <List className={classes.root} >

      <ListItem button  onClick={() => handlePageClick('home')}>
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText classes={{primary:classes.mainList}} primary="Home" />
      </ListItem>

      {/*--------- Pre-Observing Sub-Lists ---------*/}
      <ListItem button onClick={click_pre_obs}>
        <ListItemIcon>
          <AssignmentOutlinedIcon />
        </ListItemIcon>
        <ListItemText classes={{primary:classes.mainList}} primary="Pre-Observing" />
          {openPreObs ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openPreObs} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={() => handlePageClick('apply')}>
            <ListItemText classes={{primary:classes.subList}} primary="Telescope Time Application" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('cov_sheet')}>
            <ListItemText classes={{primary:classes.subList}} primary="Cover Sheet" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('remote_req')}>
            <ListItemText classes={{primary:classes.subList}} primary="Remote Observing Request" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('lris_config')}>
            <ListItemText classes={{primary:classes.subList}} primary="LRIS Configuration" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('deimos_config')}>
            <ListItemText classes={{primary:classes.subList}} primary="DEIMOS Configuration" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('too_request')}>
            <ListItemText classes={{primary:classes.subList}} primary="ToO Request" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('target_list')}>
            <ListItemText classes={{primary:classes.subList}} primary="Target List" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('vaccine_file')}>
            <ListItemText classes={{primary:classes.subList}} primary="Vaccine File" />
          </ListItem>
        </List>
      </Collapse>

      {/*--------- Observing Sub-Lists ---------*/}
      <ListItem button onClick={click_obs}>
        <ListItemIcon>
          <FlareOutlinedIcon />
        </ListItemIcon>
        <ListItemText classes={{primary:classes.mainList}} primary="Observing" />
          {openResources ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openObs} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <ListItem button onClick={() => handlePageClick('inst_status')}>
          <ListItemText classes={{primary:classes.subList}} primary="Instrument Status" />
        </ListItem>
        <ListItem button onClick={() => handlePageClick('sched_table')}>
          <ListItemText classes={{primary:classes.subList}} primary="Observing Schedule" />
        </ListItem>
        <ListItem button onClick={() => handlePageClick('obslog_table')}>
          <ListItemText classes={{primary:classes.subList}} primary="Observation Logs" />
        </ListItem>
      </List>
      </Collapse>


      {/*--------- Post-Observing Sub-Lists ---------*/}
      <ListItem button onClick={click_post_obs}>
        <ListItemIcon>
          <CloudDownloadIcon />
        </ListItemIcon>
        <ListItemText classes={{primary:classes.mainList}} primary="Post-Observing"/>
        {openPostObs ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openPostObs} timeout="auto" unmountOnExit>
        <List component="div" disablePadding >

          <ListItem button onClick={() => handlePageClick('koa_page')}>
            <ListItemText classes={{primary:classes.subList}} primary="Keck Observatory Archive" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('poc_form')}>
            <ListItemText classes={{primary:classes.subList}} primary="Post Observing Comments" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('too_report')}>
            <ListItemText classes={{primary:classes.subList}} primary="ToO Report" />
          </ListItem>
        </List>
      </Collapse>


      {/*--------- Resources Sub-Lists ---------*/}
      <ListItem button onClick={click_resources}>
        <ListItemIcon>
          <AllInclusiveIcon />
        </ListItemIcon>
        <ListItemText classes={{primary:classes.mainList}} primary="Resources" />
        {openResources ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openResources} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={() => handlePageClick('telsched')}>
            <ListItemText classes={{primary:classes.subList}} primary="Telescope Schedule" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('inst_page')}>
            <ListItemText classes={{primary:classes.subList}} primary="Instruments" />
          </ListItem>
          <ListItem button component="a" href={URLS_CONFIG.MKWC_SRC} target="_blank">
            <ListItemText classes={{primary:classes.subList}} primary="Maunakea Weather" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('vsq_page')}>
            <ListItemText classes={{primary:classes.subList}} primary="VSQ Reservations" />
          </ListItem>
        </List>
      </Collapse>


      {/*--------- Settings Sub-Lists ---------*/}
      <ListItem button onClick={click_settings}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText classes={{primary:classes.mainList}} primary="Settings" />
        {openSettings ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={openSettings} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button onClick={() => handlePageClick('user_info')}>
            <ListItemText classes={{primary:classes.subList}} primary="User Information" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('update_info')}>
            <ListItemText classes={{primary:classes.subList}} primary="Update Information" />
          </ListItem>
          <ListItem button onClick={() => handlePageClick('ssh_key')}>
            <ListItemText classes={{primary:classes.subList}} primary="Update SSH Key" />
          </ListItem>
          <ListItem button component="a" href={URLS_CONFIG.LOGOUT}  target="_blank">
            <ListItemText classes={{primary:classes.subList}} primary="Logout" />
          </ListItem>
          {/*<ListItem button onClick={() => handlePageClick('logout')}>*/}
          {/*  <ListItemText classes={{primary:classes.subList}} primary="Logout" />*/}
          {/*</ListItem>*/}
        </List>
      </Collapse>

    </List>
  );
}
