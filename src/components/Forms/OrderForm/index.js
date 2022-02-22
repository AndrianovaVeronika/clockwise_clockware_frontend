import React, {useEffect, useState} from 'react';
import './style.css';
import {Box, Button, Paper, Step, StepLabel, Stepper} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import {addOrder, getCities, getClockTypes, getMasters, getOrders} from "../../../store/actions";
import DateTimePick from "./DateTimePick";
import MasterPick from "./MasterPick";
import ResultsReport from "./ResultsReport";
import {useDispatch} from "react-redux";

const initialValues = {
    userId: '',
    clockTypeId: '',
    masterId: '',
    cityId: '',
    date: '',
    time: '',
}

const steps = ['Подробности заказа', 'Дата и время', 'Мастер', 'Проверьте данные'];
const shiftTimeStart = 10;
const shiftTimeEnd = 18;

const OrderForm = ({openButtonOnClickText}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCities());
        dispatch(getMasters());
        dispatch(getClockTypes());
        dispatch(getOrders());
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

    const hours = getHours();

    const onFormSubmit = (v, props) => {
        console.log('ON FORM SUBMIT', v)
        setValues({...values, ...v});
        handleNext();
    }

    const onSubmit = () => {
        console.log('ON SUBMIT', values)
        dispatch(addOrder(values));
    }

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
                return <CredentialsForm formId='form0' submitAction={onFormSubmit}/>
            }
            case 1 : {
                return <DateTimePick hours={hours} formId='form1' submitAction={onFormSubmit}/>
            }
            case 2 : {
                return <MasterPick hours={hours} values={values} formId='form2' submitAction={onFormSubmit}/>
            }
            case 3 : {
                return <ResultsReport values={values}/>
            }
            default:
                return;
        }
    }

    const ActiveButton = () => {
        switch (activeStep) {
            case 0: {
                return <Button type='submit' form='form0'>Далее</Button>
            }
            case 1: {
                return <>
                    <Button onClick={handleBack}>Назад</Button>
                    <Button type='submit' form='form1'>Далее</Button>
                </>
            }
            case 2: {
                return <>
                    <Button onClick={handleBack}>Назад</Button>
                    <Button type='submit' form='form2'>Далее</Button>
                </>
            }
            case steps.length - 1: {
                return <Button onClick={handleBack}>Назад</Button>
            }
            default: {
                return <>
                    <Button onClick={handleBack}>Назад</Button>
                    <Button onClick={handleNext}>Далее</Button>
                </>
            }
        }
    }

    return (
        <Paper style={{
            maxHeight: '600px',
            maxWidth: '700px',
            minHeight: '400px',
            minWidth: '500px',
            padding: '40px 30px',
            margin: '10px auto',
            flexDirection: 'column',
        }}>
            <Box sx={{
                flexDirection: 'column',
                height: '100%',
                width: '100%',
            }}>
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
                <div style={{
                    width: '100%',
                    height: '300px',
                    padding: '20px',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <ActiveStep/>
                </div>
                <div style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <ActiveButton/>
                    <Button onClick={() => setActiveStep(0)}>Очистить</Button>
                    {activeStep === steps.length - 1 && <Button onClick={onSubmit}>Отправить</Button>}
                </div>
            </Box>
        </Paper>
    )
}

export default OrderForm;