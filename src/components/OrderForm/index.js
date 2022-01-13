import React, {useEffect, useState} from 'react';
import './style.css';
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, FormControl, InputLabel, MenuItem, Select, Step, StepLabel, Stepper, TextField, Typography,
} from "@mui/material";
import CredentialsStep from "./CredentialsStep";
import store from "../../store/store";
import {addOrder, getCities} from "../../store/actions";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../store/selectors/citiesSelector";
import DateTimeStep from "./DateTimeStep";
import clockType from "../../static/clockType";

const initialValues = {
    name: '',
    login: '',
    clock_type: '',
    master_id: 0,
    city_id: 0,
    date: new Date(),
    time: new Date('9:00'),
}

const steps = ['Подробности заказа', 'Мастер', 'Дата и время'];

const OrderForm = ({openButtonOnClickText}) => {
    const [open, setOpen] = useState(false);

    const toggleForm = () => {
        setOpen(!open);
        setActiveStep(0);
    }

    const [values, setValues] = useState(initialValues);

    const handleValuesChange = ({target}) => {
        target.value ??= values[target.name];
        console.log(target);
        setValues({...values, [target.name]: target.value});
    }

    const handleDateChange = (value) => {
        console.log(value);
        setValues({...values, ['date']: new Date(value)});
    }

    // const validate = (target) => {
    //     switch (target.name) {
    //         case 'name': {
    //             if (target.value.length <= 3) {
    //                 target.helperText = 'Name is too short';
    //                 target.isError = true;
    //             }
    //             break;
    //         }
    //         default: {
    //             target.isError = false;
    //             break;
    //         }
    //     }
    // }

    const onSubmit = () => {
        console.log('submitting', values);
        // store.dispatch(addOrder(values));
        toggleForm();
    }

    const cities = useSelector(getCitiesSelector).map((city) => {
        return <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
    })

    useEffect(() => {
        store.dispatch(getCities());
    }, [])

    const [activeStep, setActiveStep] = useState(0);

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
                    handleChange={handleValuesChange}
                    cities={cities}
                />
            }
            case 1 : {
                return <div>Master picker</div>
            }
            case 2 : {
                return <DateTimeStep
                    date={values.date}
                    onChangeDate={handleDateChange}
                    minDate={new Date()}
                    // time={values.time}
                    // minTime={9}
                    // maxTime={18}
                    // onChangeTime={handleValuesChange}
                />
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