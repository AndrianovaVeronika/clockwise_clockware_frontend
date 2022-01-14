import React, {useEffect, useState} from 'react';
import './style.css';
import {
    Box,
    Button,
    Dialog, DialogActions, DialogContent,
    DialogTitle, Step, StepLabel, Stepper, Typography,
} from "@mui/material";
import CredentialsStep from "./CredentialsStep";
import store from "../../store/store";
import {addOrder, getCities, getMasters} from "../../store/actions";
import DateTimeStep from "./DateTimeStep";
import MasterStep from "./MasterStep";

const initialValues = {
    name: '',
    login: '',
    clock_type: '',
    master_id: 0,
    city_id: '',
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

    const handleValuesChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleDateChange = (value) => {
        console.log(value);
        setValues({...values, ['date']: value});
    }

    const handleMasterChange = (id) => {
        console.log(id);
        setValues({...values, ['master_id']: id});
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

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        store.dispatch(getCities());
        store.dispatch(getMasters());
    }, [])

    const ActiveStep = () => {
        switch (activeStep) {
            case 0 : {
                return <CredentialsStep
                    name={values.name}
                    login={values.login}
                    clock_type={values.clock_type}
                    city={values.city_id}
                    handleChange={handleValuesChange}
                />
            }
            case 1 : {
                // return <MasterStep
                //     master_id={values.master_id}
                //     handleMasterChange={handleMasterChange}
                // />
                return <div>Master step</div>
            }
            case 2 : {
                return <DateTimeStep
                    date={values.date}
                    handleDateChange={handleDateChange}
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