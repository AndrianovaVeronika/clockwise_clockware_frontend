import React, {useEffect, useState} from 'react';
import {Button, IconButton, Step, StepLabel, Stepper} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import {getCities} from "../../../store/actions/cities";
import {getClockTypes} from "../../../store/actions/clockTypes";
import {getAvailableMasters, getMasters} from "../../../store/actions/masters";
import DateTimePick from "./DateTimePick";
import MasterPick from "./MasterPick";
import ResultsReport from "./ResultsReport";
import {useDispatch, useSelector} from "react-redux";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {getOrderUserSelector} from "../../../store/selectors/authSelector";
import LoginOrSignup from "./LoginOrSignup";
import useStyles from "../../../styles/useStyles";
import {addOrder} from "../../../store/actions/orders";
import {findUserOrCreate} from "../../../store/actions/auth";

const initialValues = {
    userId: '',
    clockTypeId: '',
    masterId: '',
    cityId: '',
    date: '',
    time: ''
};

const steps = ['User data', 'Credentials', 'Date & Time', 'Master', 'Check all'];
const shiftTimeStart = 10;
const shiftTimeEnd = 18;

const OrderForm = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        dispatch(getCities());
        dispatch(getMasters());
        dispatch(getClockTypes());
    }, [dispatch]);

    // returns all hours available within a day
    const getHours = () => {
        const hours = [];
        for (let i = shiftTimeStart; i <= shiftTimeEnd; i++) {
            hours.push(i + ':00:00');
        }
        return hours;
    }

    //returns tomorrow date
    const getTomorrowDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
    }

    const hours = getHours();
    const minOrderDay = getTomorrowDate();

    const onFormSubmit = (v, props) => {
        console.log(v)
        setValues({...values, ...v});
        handleNext();
    }

    const onLoginSubmit = (values, props) => {
        dispatch(findUserOrCreate(values));
        handleNext();
    };

    const onSubmit = (e) => {
        dispatch(addOrder(values));
        e.preventDefault();
        handleClean();
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleClean = () => {
        setValues(initialValues);
        setActiveStep(0);
    }

    const ActiveStep = () => {
        switch (activeStep) {
            case 0 : {
                return <LoginOrSignup
                    formId='form0'
                    onSubmit={onLoginSubmit}
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
                    hours={hours}
                    formId='form2'
                    submitAction={onFormSubmit}
                    minDate={minOrderDay}
                    values={values}
                />
            }
            case 3 : {
                dispatch(getAvailableMasters(values));
                return <MasterPick
                    hours={hours}
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
        <>
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
                        <IconButton
                            disabled={activeStep === steps.length - 1}
                            type='submit'
                            form={'form' + activeStep}
                        >
                            <ArrowForwardIosRoundedIcon/>
                        </IconButton>
                        {activeStep === steps.length - 1 &&
                        <Button type='submit' form='order-form'>Submit</Button>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderForm;