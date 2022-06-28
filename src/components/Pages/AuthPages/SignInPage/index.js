import React, {useEffect} from 'react';
import SignInForm from "../../../Forms/SignInForm";
import {Box} from "@mui/material";
import useStyles from "../../../../styles/useStyles";
import {useSelector} from "react-redux";
import {isAuthUserSelector} from "../../../../store/selectors/authSelector";
import {useNavigate} from "react-router";

const SignInPage = () => {
    const classes = useStyles();
    const isAuth = useSelector(isAuthUserSelector);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth){
            navigate('/profile');
        }
    }, [isAuth]);

    return (

        <Box className={classes.authPageOutContainer}>
            <Box className={classes.authPageContent}>
                <SignInForm/>
            </Box>
        </Box>
    )
}

export default SignInPage;