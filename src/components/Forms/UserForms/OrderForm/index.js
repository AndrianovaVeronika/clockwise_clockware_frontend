import React, {useEffect, useState} from 'react';
import {Alert, AlertTitle, Box, Button, IconButton, Paper, Step, StepLabel, Stepper} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import DateTimePick from "./DateTimePick";
import MasterPick from "./MasterPick";
import ResultsReport from "./ResultsReport";
import {useDispatch, useSelector} from "react-redux";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import LoginOrSignup from "./LoginOrSignup";
import useStyles from "../../../../styles/useStyles";
import orders from "../../../../store/actions/orders";
import {getCurrentUserSelector} from "../../../../store/selectors/authSelector";
import LoginAlertDialog from "../../../Dialogs/LogInAlertDialog";
import OrderSuccessAlertDialog from "../../../Dialogs/OrderSuccessAlertDialog";
import {useTranslation} from "react-i18next";
import {getAllClockTypes} from "../../../../store/getters/clockTypes";
import {getAllCities} from "../../../../store/getters/cities";

const initialValues = {
    name: '',
    email: '',
    clockTypeId: '',
    masterId: '',
    cityId: '',
    date: '',
    time: ''
};

const getSteps = (t) => {
    const steps = [];
    for (let i = 0; i < 5; i++) {
        steps.push(t(`forms.userOrderForm.steps.${i}`));
    }
    return steps;
}

const OrderForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [values, setValues] = useState(initialValues);
    const steps = getSteps(t);
    const currentUser = useSelector(getCurrentUserSelector);

    const [clockTypesOptions, setClockTypesOptions] = useState([]);
    const [citiesOptions, setCitiesOptions] = useState([]);
    useEffect(() => {
        const retrieveData = async () => {
            const clockTypes = await getAllClockTypes();
            setClockTypesOptions(clockTypes.map(clockType => ({
                key: clockType.id,
                value: t(`clockTypes.${clockType.name}`)
            })));
            const cities = await getAllCities();
            setCitiesOptions(cities.data.map(city => ({
                key: city.id,
                value: city.name
            })));
        }
        retrieveData();
    }, []);

    const [displayLoginError, setDisplayLoginError] = useState(false);
    const onFormSubmit = (v, params) => {
        setValues({...values, ...v});
        if (params) {
            if (params.code === 401) {
                setDisplayLoginError(true);
            }
        } else {
            handleNext();
        }
    };

    const [Error, setError] = useState(<></>);
    const [displaySuccessDialog, setDisplaySuccessDialog] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const {error, payload} = await dispatch(orders.add(values));
        setError(
            <Alert severity="error" key={payload.message}>
                <AlertTitle>Error</AlertTitle>
                {payload.message}
            </Alert>
        );
        if (!error) {
            setError(<></>);
            handleClean();
            setDisplaySuccessDialog(true);
        }
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            return prevActiveStep + 1;
        });
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
                    onSubmit={onFormSubmit}
                    values={values}
                    currentUser={currentUser}
                />
            }
            case 1 : {
                return <CredentialsForm
                    formId='form1'
                    submitAction={onFormSubmit}
                    values={values}
                    clockTypesOptions={clockTypesOptions}
                    citiesOptions={citiesOptions}
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
        <Box>
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
                                    <Button onClick={handleClean}>{t("forms.userOrderForm.cleanButton")}</Button>
                                    <Button
                                        type='submit'
                                        form='order-form'
                                    >{t("forms.userOrderForm.submitButton")}</Button>
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
            {displayLoginError && <LoginAlertDialog
                display={displayLoginError}
                onClose={() => setDisplayLoginError(false)}
            />}
            {displaySuccessDialog && <OrderSuccessAlertDialog
                display={displaySuccessDialog}
                onClose={() => setDisplaySuccessDialog(false)}
            />}
        </Box>
    )
}

export default OrderForm;