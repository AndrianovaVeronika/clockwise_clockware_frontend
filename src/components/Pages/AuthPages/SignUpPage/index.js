import React, {useState} from 'react';
import UserSignUpForm from "../../../Forms/UserForms/UserSignUpForm";
import {Box, Button, Checkbox, Paper, Typography} from "@mui/material";
import useStyles from "../../../../styles/useStyles";
import MasterSignUpForm from "../../../Forms/MasterForms/MasterSignUpForm";
import {useNavigate} from "react-router";

const SignUpPage = () => {
    const classes = useStyles();
    const navigate = useNavigate();

    const [isMaster, setIsMaster] = useState(false);
    const [isAgreeCheckboxPressed, setAgreeCheckboxPressed] = useState(false);
    const [Error, setError] = useState(<></>);

    return (
        <Box className={classes.authPageOutContainer}>
            <Box className={classes.authPageContent}>
                <Paper elevation={3} className={classes.formPaper}>
                    <Box className={classes.authFormCheckbox}>
                        <Checkbox onChange={() => setIsMaster(!isMaster)}/>
                        <Typography>I am a master</Typography>
                    </Box>
                    {isMaster ? <MasterSignUpForm setError={setError}/> : <UserSignUpForm setError={setError}/>}
                    <Box className={classes.authFormCheckbox}>
                        <Checkbox onChange={() => setAgreeCheckboxPressed(!isAgreeCheckboxPressed)}/>
                        <Typography>I agree with company policy</Typography>
                    </Box>
                    <div className={classes.authFormButtons}>
                        <Button onClick={() => navigate('/')}>Cancel</Button>
                        <Button
                            type='submit'
                            form='signup-form'
                            disabled={!isAgreeCheckboxPressed}
                        >Submit</Button>
                    </div>
                    {Error}
                </Paper>
            </Box>
        </Box>
    )
}

export default SignUpPage;