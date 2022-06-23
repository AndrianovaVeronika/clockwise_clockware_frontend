import React from 'react';
import SignInForm from "../../../Forms/SignInForm";
import {Box} from "@mui/material";
import useStyles from "../../../../styles/useStyles";

const SignInPage = () => {
    const classes = useStyles();

    return (
        <Box className={classes.authPageOutContainer}>
            <Box className={classes.authPageContent}>
                <SignInForm/>
            </Box>
        </Box>
    )
}

export default SignInPage;