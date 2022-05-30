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
import {getUsers} from "../../../store/actions/users";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {isAdminSelector} from "../../../store/selectors/authSelector";

const steps = ['Credentials', 'Date & Time', 'Master', 'Check all'];
const shiftTimeStart = 10;
const shiftTimeEnd = 18;

const OrderForm = ({specifiedInitialValues, submitAction, isDialog, closeOnSubmit}) => {
    const initialValues = specifiedInitialValues ? {
        ...specifiedInitialValues,
        userId: specifiedInitialValues.username,
        clockTypeId: specifiedInitialValues.clockType,
        masterId: specifiedInitialValues.master,
        cityId: specifiedInitialValues.city,
    } : {
        userId: '',
        clockTypeId: '',
        masterId: '',
        cityId: '',
        date: '',
        time: ''
    };

    const dispatch = useDispatch();
    const isAdmin = useSelector(isAdminSelector);

    useEffect(() => {
        if (isAdmin) {
            dispatch(getUsers());
        }
        dispatch(getCities());
        dispatch(getMasters());
        dispatch(getClockTypes());
    }, [dispatch]);

    const [values, setValues] = useState(initialValues);

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
        setValues({...values, ...v});
        handleNext();
    }

    const onSubmit = (e) => {
        dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues.id, ...values} : values));
        e.preventDefault();
        if (!isDialog) {
            handleClean();
        } else {
            closeOnSubmit();
        }
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
                return <CredentialsForm
                    formId='form0'
                    submitAction={onFormSubmit}
                    specifiedInitialValues={values}
                />
            }
            case 1 : {
                return <DateTimePick
                    hours={hours}
                    formId='form1'
                    submitAction={onFormSubmit}
                    minDate={minOrderDay}
                    values={values}
                />
            }
            case 2 : {
                dispatch(getAvailableMasters(values));
                return <MasterPick
                    hours={hours}
                    values={values}
                    formId='form2'
                    submitAction={onFormSubmit}
                />
            }
            case 3 : {
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
            <Stepper activeStep={activeStep} style={{height: '20%'}}>
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
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '30px'
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '60%',
                }}>
                    <ActiveStep/>
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
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