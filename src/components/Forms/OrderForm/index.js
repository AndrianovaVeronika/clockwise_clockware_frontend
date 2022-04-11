import React, {useEffect, useState} from 'react';
import {Button, Step, StepLabel, Stepper} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import {getOrders} from "../../../store/actions/orders";
import {getCities} from "../../../store/actions/cities";
import {getClockTypes} from "../../../store/actions/clockTypes";
import {getMasters} from "../../../store/actions/masters";
import DateTimePick from "./DateTimePick";
import MasterPick from "./MasterPick";
import ResultsReport from "./ResultsReport";
import {useDispatch} from "react-redux";
import {getUsers} from "../../../store/actions/users";

const steps = ['Подробности заказа', 'Дата и время', 'Мастер', 'Проверьте данные'];
const shiftTimeStart = 10;
const shiftTimeEnd = 18;

const OrderForm = ({specifiedInitialValues, submitAction}) => {
    const initialValues = specifiedInitialValues ? {
        ...specifiedInitialValues,
        userId: specifiedInitialValues.username,
        clockTypeId: specifiedInitialValues.clock_type,
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

    useEffect(() => {
        dispatch(getUsers());
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

    //returns tomorrow date
    const getTomorrowDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 1);
        return date;
    }

    const hours = getHours();
    const minOrderDay = getTomorrowDate();

    const onFormSubmit = (v, props) => {
        console.log('ON FORM SUBMIT', v)
        setValues({...values, ...v});
        handleNext();
    }

    const onSubmit = () => {
        console.log('ON SUBMIT', values);
        dispatch(submitAction(values));
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
                    initialValues={values}
                />
            }
            case 1 : {
                return <DateTimePick
                    hours={hours}
                    formId='form1'
                    submitAction={onFormSubmit}
                    minDate={minOrderDay}
                    initialValues={{date: values.date, time: values.time}}
                />
            }
            case 2 : {
                return <MasterPick
                    hours={hours}
                    values={values}
                    formId='form2'
                    submitAction={onFormSubmit}
                />
            }
            case 3 : {
                return <ResultsReport
                    formId='form3'
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
                    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {activeStep !== 0 && <Button onClick={handleBack}>Назад</Button>}
                        <Button type='submit' form={'form' + activeStep}>Далее</Button>
                        <Button onClick={handleClean}>Очистить</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderForm;