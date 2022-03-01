import React, {useEffect, useState} from 'react';
import {Button, Paper, Step, StepLabel, Stepper} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import {addOrder, getCities, getClockTypes, getMasters, getOrders, sendMail} from "../../../store/actions";
import DateTimePick from "./DateTimePick";
import MasterPick from "./MasterPick";
import ResultsReport from "./ResultsReport";
import {useDispatch} from "react-redux";
import store from "../../../store/store";

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

const OrderForm = () => {
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
                return <ResultsReport formId='form3' onFinalSubmit={onSubmit} values={values}/>
            }
            default:
                return;
        }
    }

    return (
        <Paper style={{
            maxHeight: '400px',
            maxWidth: '700px',
            minHeight: '300px',
            minWidth: '500px',
            padding: '40px 30px',
            margin: '10px auto',
            flexDirection: 'column',
        }}>
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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {activeStep !== 0 && <Button onClick={handleBack}>Назад</Button>}
                        <Button type='submit' form={'form' + activeStep}>Далее</Button>
                        <Button onClick={() => setActiveStep(0)}>Очистить</Button>
                    </div>
                </div>
            </div>
        </Paper>
    )
}

export default OrderForm;