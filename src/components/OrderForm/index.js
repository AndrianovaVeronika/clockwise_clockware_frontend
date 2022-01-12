import React, {useEffect, useState} from 'react';
import './style.css';
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, MenuItem, Step, StepLabel, Stepper, Typography,
} from "@mui/material";
import CredentialsStep from "./CredentialsStep";
import store from "../../store/store";
import {addOrder, getCities} from "../../store/actions";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../store/selectors/citiesSelector";

const initialValues = {
    name: {
        value: '',
        isError: false,
        helperText: '',
    },
    login: {
        value: '',
        isError: false,
        helperText: '',
    },
    clock_type: {
        value: '',
        isError: false,
        helperText: '',
    },
    master_id: {
        value: 0,
        isError: false,
        helperText: '',
    },
    city_id: {
        value: '',
        isError: false,
        helperText: '',
    },
    date: {
        value: new Date(),
        isError: false,
        helperText: '',
    },
    time: {
        value: new Date(),
        isError: false,
        helperText: '',
    },
}

const steps = ['Подробности заказа', 'Дата и время', 'Мастер'];

const OrderForm = ({openButtonOnClickText}) => {
    const [open, setOpen] = useState(false);

    const toggleForm = () => {
        setOpen(!open);
        setActiveStep(0);
    }

    const [values, setValues] = useState(initialValues);

    const handleCredentialsChange = ({target}) => {
        console.log(target.name, target.value);
        setValues({...values, [target.name]: {value: target.value}});
    }

    //when its date, string is passed to newDateTime unlike other
    // const handleDateTimeChange = (newDateTime) => {
    //     const target = {name: 'datetime', value: new Date(newDateTime)};
    //     setValues({...values, [target.name]: target.value});
    // }

    const validateFields = () => {
        for (const field in values) {
            if (values[field].value === initialValues[field].value) {
                values[field].isError = true;
                values[field].helperText = 'Field cannot be empty';
            } else {
                switch (field) {
                    case 'name': {
                        if (values[field].value.length <= 3) {
                            values[field].helperText = 'Name is too short';
                            values[field].isError = true;
                        }
                        break;
                    }
                    default: {
                        values[field].isError = false;
                        break;
                    }
                }
            }
        }
    }

    useEffect(() => {
        validateFields();
    }, [values]);

    const ifError = () => {
        for (const field in values) {
            if (values[field].isError) {
                return true;
            }
        }
        return false;
    }

    const onSubmit = () => {
        console.log(values);
        if (ifError()) {
            console.log("!ERROR IN FIELDS");
            toggleForm();
            return;
        }
        store.dispatch(addOrder(values));
        toggleForm();
    }

    const cities = useSelector(getCitiesSelector).map((city) => {
        return <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
    })

    useEffect(() => {
        store.dispatch(getCities());
    }, [])

    const [activeStep, setActiveStep] = useState(0);

    const isStepOptional = (step) => {
        return step === 1;
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const ActiveStep = () => {
        switch (activeStep) {
            case 0 : {
                return <CredentialsStep
                    name={values.name}
                    login={values.login}
                    clock_type={values.clock_type}
                    city={values.city_id}
                    handleCredentialsChange={handleCredentialsChange}
                    cities={cities}
                />
            }
            case 1 : {
                return <div>Date & Time picker</div>
            }
            case 2 : {
                return <div>Master picker</div>
            }
        }
    }

    return (
        <>
            <Button
                {...{
                    color: 'inherit',
                    onClick: toggleForm
                }}
            >{openButtonOnClickText}</Button>
            <Dialog open={open} onClose={toggleForm}>
                <DialogTitle>Введите данные чтобы заказать мастера</DialogTitle>
                <DialogContent>
                    <Box sx={{width: '100%'}}>
                        <Stepper activeStep={activeStep}>
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
                        { //Steps body
                            activeStep === steps.length ? (
                                    <Typography sx={{mt: 2, mb: 1}}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                ) :
                                (
                                    <ActiveStep/>
                                )
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{mr: 1}}
                    >Back</Button>
                    {
                        activeStep === steps.length ?
                            <Button onClick={onSubmit}>Заказать</Button> :
                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                    }
                    <Button onClick={toggleForm}>Отмена</Button>


                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderForm;