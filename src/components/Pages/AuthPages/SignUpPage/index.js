import React from 'react';
import SignUpForm from "../../../Forms/UserForms/SignUpForm";
import {Box} from "@mui/material";
import useStyles from "../../../../styles/useStyles";

const SignUpPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.authPageOutContainer}>
            <Box className={classes.authPageContent}>
                <SignUpForm/>
            </Box>
        </Box>
    )
}

export default SignUpPage;