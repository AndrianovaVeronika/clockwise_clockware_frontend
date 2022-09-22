import React, {useEffect, useState} from 'react';
import {Alert, Box, Button, Paper} from "@mui/material";
import useStyles from "../../../../styles/useStyles";
import {useLocation, useNavigate} from "react-router";
import {verifyEmailState} from "../../../../store/actions/auth";
import {useDispatch} from "react-redux";

const EmailVerificationStatePage = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [{message, isEmailValid}, setData] = useState({});

    const getText = async () => {
        console.log(location.pathname)
        const income = await dispatch(verifyEmailState(location.pathname));
        setData(income.payload);
    }

    useEffect(async () => {
        await getText();
    }, []);

    return (
        <Box className={classes.authPageOutContainer}>
            <Box className={classes.authPageContent}>
                <Paper className={classes.paper}>
                    <Alert severity={isEmailValid ? "success" : "error"}>{message}</Alert>
                    <Button onClick={() => navigate('/profile')}>Profile</Button>
                </Paper>
            </Box>
        </Box>
    )
}

export default EmailVerificationStatePage;