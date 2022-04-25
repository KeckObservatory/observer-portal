import {makeStyles} from "@material-ui/core/styles";
import BgImg from "./img/banner_image.jpg";


export function style_sheet() {
    const drawerWidth = 220;

    // const useStyles = makeStyles((theme) => ({
    return( makeStyles((theme) => ({
        root: {
//            background: 'linear-gradient(340deg, #F5F5F5 30%, #191970 90%)',
//            background: 'linear-gradient(340deg, #F5F5F5, #191970 70%)',
            background: 'linear-gradient(340deg, #FFFFFF, #000000 80%)',
            border: 0,
            borderRadius: 3,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            color: 'white',
            height: '100vh',
            padding: '0 30px',
        },
        dsiLinks: {
            background: '#539ee2',

            // background: '#191970',
            height: 100,
            color: 'white',
            border: 0,
            borderRadius: 10,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            // height: 400,
            padding: '0 30px',
        },
        dsiLinkTitle: {
            // background: 'linear-gradient(340deg, #F5F5F5 30%, #191970 90%)',
            background: '#191970',
            height: 40,
            color: 'white',
            border: 0,
            borderRadius: 10,
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            // height: 400,
            // padding: '0 30px',
        },
        iframeSpinner: {
          height: 2400,
          textAlign: "center",
        },
        alert: {
//          background: 'linear-gradient(340deg, #000000 30%, #191970 90%)',
          background: '#7F7E7E',
          height: 40,
          width: '85%',
          color: 'white',
          border: 0,
          borderRadius: 10,
        },
        // dusk: {
        //   background: 'radial-gradient(orange, #1f3c9b, #0e183d, #171e36)',
        //   opacity: 1;
        //   position: fixed;
        //   height: 100vh;
        //   width: 100vw;
        //   top: 0;
        //   left: 0;
        //   z-index: 1;
        // },
        //
        // dawn: {
        //   background: radial-gradient(#efb456 5%, 15%, #2c55db 50%, #3c4e8c, #2b3866); background-size: 200% 250%;background-position:  0% -100px;background-repeat: no-repeat;
        //   opacity: 1;
        //   position: fixed;
        //   height: 100vh;
        //   width: 100vw;
        //   bottom: 0;
        //   right: 0;
        //   z-index: 1;
        //   animation: sunrise 3s ease-in 1;
        //   animation-fill-mode: forwards;
        // },
        UTclock: {
            background: 'linear-gradient(340deg, #000000 30%, #191970 90%)',
            height: 80,
            width: '20%',
            color: 'white',
            border: 0,
            borderRadius: 10,
        },
        toolbar: {
//            backgroundImage: `url(${BgImg})`,
            background: '#000000',
            height: 60,
            paddingRight: 24, // keep right padding when drawer closed
        },
        bg_field: {
//            backgroundImage: `url(${BgImg})`,
            background: '#000000',
            height: '100vh',
            paddingRight: 24, // keep right padding when drawer closed
        },
        header: {
//            backgroundImage: `url(${BgImg})`,
//            background: '#191970',
            background: '#000000',
            font: "Philosopher",
            fontSize: 18,
            color: "#ffbf00",
            lineHeight: 1,
            letterSpacing: 0,
            textAlign: "center",
            materialType: "MeshPhongMaterial"
        },
        infoTable: {
            height: 20,
        },
        infoCell: {
            font: "Philosopher",
            fontSize: 12,
            // color: "#ffbf00",
            lineHeight: 1,
            letterSpacing: 0,
            textAlign: "left",
            materialType: "MeshPhongMaterial"
        },
        statusHead: {
            background: '#191970',
            font: "Philosopher",
            fontSize: 12,
            color: "white",
            lineHeight: 1,
            letterSpacing: 0,
            textAlign: "left",
        },
        small_header: {
            // background: 'linear-gradient(340deg, #0052cc 30%, #F5F5F5 90%)',
            // background: 'linear-gradient(2000deg, #fffdd0 30%, #008080 80%)',
            background: 'linear-gradient(90deg, #ffbf00 30%, #F5F5F5 80%)',
            // backgroundColor: '#191970',
            color: 'white'
        },
        big_header: {
            backgroundColor: '#539ee2',
            color: 'white'
        },

        toolbarIcon: {
            background: '#000000',
            height: 60,
            color: 'white',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0 8px',
            size: 'small',
            ...theme.mixins.toolbar,
        },
        statcontainer: {
            height: '40px',
        },
        appBar: {
            height: '100vh',

            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        sideBar: {
            fontSize: 10
        },

        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            height: '100vh',
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
            color: 'white',
        },
        tableCollapse: {
            width: 10,
            color: 'green',
        },
        menuButtonHidden: {
            display: 'none',
        },
        drawerPaper: {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
        },
        drawerPaperClose: {
            overflowX: 'hidden',
            fontSize: 10,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            width: theme.spacing(7),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9),
            },
        },
        appBarSpacer: theme.mixins.toolbar,
    })))
}

