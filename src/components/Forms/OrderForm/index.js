import React, {useEffect, useState} from 'react';
import {Alert, AlertTitle, Box, Button, IconButton, Paper, Step, StepLabel, Stepper} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import {getCities} from "../../../store/actions/cities";
import {getClockTypes} from "../../../store/actions/clockTypes";
import {getAvailableMasters, getMasters} from "../../../store/actions/masters";
import DateTimePick from "./DateTimePick";
import MasterPick from "./MasterPick";
import ResultsReport from "./ResultsReport";
import {useDispatch} from "react-redux";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import LoginOrSignup from "./LoginOrSignup";
import useStyles from "../../../styles/useStyles";
import {addOrder} from "../../../store/actions/orders";
import {cleanErrors} from "../../../store/actions/errors";
import {useNavigate} from "react-router";

const initialValues = {
    username: '',
    email: '',
    clockTypeId: '',
    masterId: '',
    cityId: '',
    date: '',
    time: ''
};

const OrderForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const [values, setValues] = useState(initialValues);
    const steps = ['User data', 'Credentials', 'Date & Time', 'Master', 'Check all'];

    useEffect(() => {
        dispatch(getCities());
        dispatch(getMasters());
        dispatch(getClockTypes());
    }, [dispatch]);

    const onFormSubmit = (v, props) => {
        handleNext();
        setValues({...values, ...v});
    }

    const [Error, setError] = useState(<></>);

    const onSubmit = async (e) => {
        e.preventDefault();
        const {error, payload} = await dispatch(addOrder(values));
        setError(
            <Alert severity="error" key={payload.message}>
                <AlertTitle>Error</AlertTitle>
                {payload.message}
            </Alert>
        );
        if (!error) {
            setError(<></>);
            navigate('/order/success');
        }
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            if (prevActiveStep === 2) {
                dispatch(getAvailableMasters(values));
            }
            return prevActiveStep + 1;
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClean = () => {
        dispatch(cleanErrors('orders'));
        setValues(initialValues);
        setActiveStep(0);
    }

    const ActiveStep = () => {
        switch (activeStep) {
            case 0 : {
                return <LoginOrSignup
                    formId='form0'
                    onSubmit={onFormSubmit}
                    values={values}
                />
            }
            case 1 : {
                return <CredentialsForm
                    formId='form1'
                    submitAction={onFormSubmit}
                    values={values}
                />
            }
            case 2 : {
                return <DateTimePick
                    formId='form2'
                    submitAction={onFormSubmit}
                    values={values}
                />
            }
            case 3 : {
                return <MasterPick
                    values={values}
                    formId='form3'
                    submitAction={onFormSubmit}
                />
            }
            case 4 : {
                return <ResultsReport
                    formId='order-form'
                    onFinalSubmit={onSubmit}
                    values={values}
                />
            }
            default:
                return;
        }
    }

    return (
        <Box className={classes.profileContent}>
            <Paper className={classes.orderFormPaper}>
                <Stepper activeStep={activeStep} className={classes.stepper}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                <div className={classes.orderFormOutsideContainer}>
                    <div className={classes.orderFormInsideContainer}>
                        <ActiveStep/>
                        <div className={classes.orderFormButtons}>
                            <IconButton disabled={activeStep === 0} onClick={handleBack}>
                                <ArrowBackIosRoundedIcon/>
                            </IconButton>
                            {(activeStep === steps.length - 1) ?
                                <>
                                    <Button onClick={handleClean}>Clean</Button>
                                    <Button type='submit' form='order-form'>Submit</Button>
                                </> : <IconButton
                                    type='submit'
                                    form={'form' + activeStep}
                                >
                                    <ArrowForwardIosRoundedIcon/>
                                </IconButton>}
                        </div>
                        {Error}
                    </div>
                </div>
            </Paper>
        </Box>
    )
}

export default OrderForm;