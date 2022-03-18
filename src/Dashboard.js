import * as React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Header from './Header';
import Alerts from './NextAlert';
import NestedList from './SidebarList';
import HomeView from "./HomeView"
import Iframe from "./iframe"
import ObsLogTable from "./ObsLogTable";
import SchedTable from "./SchedTable";
import PropTable from "./ProposalTable";
import InfoTable from "./InfoTable";
import {style_sheet} from "./Styles"
//import PlanetAnimation from "./PlanetAnimation/Planets";
import URLS_CONFIG from "./urls_config.live.json";

const useStyles = style_sheet()
const LOCAL_HOST = 'https://' + window.location.hostname;


export default function Dashboard(props) {

  // try {
  //   import PlanetAnimation from "./PlanetAnimation/Planets";
  // } catch (err) {
  //   import PlanetAnimation from "./PlanetAnimation/PlanetBlank";
  //
  // }

  const userinfo = props.userinfo

  // change from PILOGIN_DEV to PILOGIN to change the url root
  const pilogin_root = URLS_CONFIG.PILOGIN

  // Siyi
  // const obsid = "3178"
  // John O'Meara
  // const obsid = "1883"
  // const obsid = "2003"
  const obsid = userinfo.Id

  const classes = useStyles();

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
        setOpen(!open);
  };

  const [state, setState] = React.useState('home');
  const setPageName = (val) => {
        setState(val)
  };

  return (
    <Box minHeight={'100vh'} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        {/* Keck Observatory label*/}
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>

          {/*PI name banner*/}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs>
              <Paper className={classes.paper}><Header userinfo={userinfo} classes={classes} /></Paper>
            </Grid>

            <Grid item xs>
              {/* <PlanetAnimation /> */}
            </Grid>

            <Grid item xs>
              <Paper className={classes.alert}><Alerts obsid={obsid}/></Paper>
            </Grid>

          </Grid>

        </Toolbar>

        {state === 'home' && (<HomeView pilogin={pilogin_root} obsid={obsid} classes={classes}/>)}
        {state === 'remote_req' && <Iframe source={pilogin_root + URLS_CONFIG.REMOTE_OBS_SRC} classes={classes}/>}
        {state === 'cov_sheet' && <Iframe source={pilogin_root + URLS_CONFIG.COVSHEET} classes={classes}/>}
        {state === 'lris_config' && <Iframe source={URLS_CONFIG.LRIS_CONFIG_SRC} classes={classes}/>}
        {state === 'deimos_config' && <Iframe source={URLS_CONFIG.DEIMOS_CONFIG_SRC} classes={classes}/>}
        {state === 'target_list' && <Iframe source={URLS_CONFIG.TARGET_LIST_SRC} classes={classes} />}
        {state === 'vaccine_file' && <Iframe source={pilogin_root + URLS_CONFIG.VACCINE_SRC} classes={classes} />}

        {state === 'too_report' && <Iframe source={pilogin_root + URLS_CONFIG.TOO_REPORT_SRC} classes={classes}/>}
        {state === 'too_request' && <Iframe source={pilogin_root + URLS_CONFIG.TOO_REQUEST_SRC} classes={classes}/>}
        {state === 'poc_form' && <Iframe source={pilogin_root + URLS_CONFIG.POC_SRC} classes={classes} />}
        {state === 'user_info' && <InfoTable userinfo={userinfo} classes={classes}/>}
        {state === 'inst_status' && <Iframe source={URLS_CONFIG.SIAS_SRC} classes={classes}/>}
        {state === 'telsched' && <Iframe source={URLS_CONFIG.TELSCHED_SRC} classes={classes}/>}
        {state === 'koa_page' && <Iframe source={URLS_CONFIG.KOA_SRC} classes={classes} />}
        {state === 'sched_table' && <SchedTable obsid={obsid} classes={classes} nrows={22} width={12}/>}
        {/*{state === 'obslog_table' && <ObsLogTable pilogin={pilogin_root} obsid={obsid} nrows={22} classes={classes}/>}*/}
        {state === 'prop_table' && <PropTable obsid={obsid} classes={classes} nrows={22} width={12} entry_form={1}/>}
        {state === 'apply' && <Iframe source={URLS_CONFIG.APPLY_SRC} classes={classes} bg_color='#FFFDD0'/>}

        {/*Resources*/}
        {state === 'inst_page' && <Iframe source={URLS_CONFIG.INST_SRC} classes={classes}/>}
        {state === 'mkwc' && <Iframe source={URLS_CONFIG.MKWC_SRC} classes={classes}/>}
        {state === 'vsq_page' && <Iframe source={URLS_CONFIG.VSQ_SRC} classes={classes}/>}

        {/*Settings*/}
        {state === 'update_info' && <Iframe source={pilogin_root + URLS_CONFIG.UPDATE_INFO_SRC} classes={classes}/>}
        {state === 'ssh_key' && <Iframe source={pilogin_root + URLS_CONFIG.SSH_SRC} classes={classes}/>}
        {state === 'logout' && <Iframe source={LOCAL_HOST + URLS_CONFIG.LOGOUT} classes={classes}/>}

      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon} >
          <IconButton onClick={toggleDrawer} size={'small'} className={clsx(classes.toolbarIcon)}>
            <ChevronLeftIcon /> Keck Observatory
          </IconButton>
        </div>
        <Divider />
        <NestedList setPageName={setPageName}/>
      </Drawer>
    </Box>
  );
}
