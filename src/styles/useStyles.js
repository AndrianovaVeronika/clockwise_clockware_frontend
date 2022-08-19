import React from 'react';
import {makeStyles} from "@mui/styles";
import vehicle from "../static/vehicle.png";
import gearsBackgroundImage from "../static/gears-background-image.jpg";

export const useStyles = makeStyles((theme) => ({
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)'
        },
        '100%': {
            transform: 'rotate(360deg)'
        }
    },
    //header styles
    header: {},
    title: {
        flexGrow: 1
    },
    menuButton: {
        fontFamily: "Open Sans, sans-serif",
        fontWeight: 700,
        size: "18px"
    },
    //main content styles
    main: {
        position: 'relative',
        flexGrow: 1
    },
    //home page styles
    homePageContent: {
        position: "relative",
        padding: '50px!important',
        display: 'flex!important',
        height: '100%'
    },
    homePageText: {
        padding: '25px',
        width: '55%'
    },
    link: {
        fontSize: '20px'
    },
    homePageImageContainer: {
        width: '45%',
        height: '100%',
        display: "flex"
    },
    homePageImage: {
        backgroundImage: `url(${vehicle})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '100%'
    },
    //auth page styles
    authPageOutContainer: {
        height: 'inherit',
        width: 'inherit',
        display: "flex",
        justifyContent: 'center',
        alignContent: 'center'
    },
    authPageContent: {
        backgroundImage: `url(${gearsBackgroundImage})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        width: '50%',
        height: '95%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    masterSignUpForm: {
        display: "flex",
        flexDirection: 'row',
    },
    authFormCheckbox: {
        display: 'flex',
        alignItems: 'center'
    },
    //auth form styles
    formPaper: {
        display: 'flex',
        wrap: 'wrap',
        flexDirection: 'column',
        padding: '30px',
        maxWidth: '500px'
    },
    authFormButtons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    masterFormSection: {
        margin: '10px'
    },
    //email verification page
    paper: {
        padding: '20px'
    },
    //form styles
    formItem: {
        margin: '5px!important'
    },
    formItemLabel: {
        marginLeft: '5px!important'
    },
    //sidebar
    sidebar: {
        height: '100%',
        backgroundColor: '#1d1d1d',
    },
    sidebarMenu: {
        width: '100%',
        backgroundColor: '#1d1d1d',
        margin: '10px'
    },
    //profile page
    profileContent: {
        padding: '30px'
    },
    //order page
    orderFormPaper: {
        height: '400px',
        width: '500px',
        padding: '40px 30px',
        flexDirection: 'column',
    },
    stepper: {
        height: '20%'
    },
    orderFormOutsideContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1,
        padding: '30px',
    },
    orderFormInsideContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
    },
    orderFormButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    masterPick: {
        width: '425px',
        height: '250px'
    },
    //data table
    dataTable: {
        height: '400px',
        border: '4px double black',
        display: 'flex'
    },
    iconButton: {
        width: '50px',
        height: '50px'
    },
    //admin order form
    adminOrderForm: {
        display: 'flex'
    },
    adminOrderFormSide: {
        width: '50%',
        padding: '10px',
    },
    //dialog
    dialog: {
        overflow: 'hidden!important'
    }
}));

export default useStyles;