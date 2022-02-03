import React, {useEffect, useState} from 'react';
import './style.css';
import {
    Box, Button, Step, StepLabel, Stepper, switchClasses, Typography,
} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import store from "../../store/store";
import {addOrder, getCities, getMasters} from "../../store/actions";
import DateTimeForm from "./DateTimeForm";
import moment from "moment";
import ChooseMasterForm from "./ChooseMasterForm";
import FormDialog from "../FormDialog";

const initialValues = {
    name: '',
    login: '',
    clock_type: '',
    master_id: 0,
    city_id: 0,
    date: '',
    time: '',
}

const steps = ['Подробности заказа', 'Мастер', 'Дата и время'];

const shiftTimeStart = 10;
const shiftTimeEnd = 18;

const OrderForm = ({openButtonOnClickText}) => {
    const [values, setValues] = useState(initialValues);

    const onCredentialsChange = (v, props) => {
        console.log(v);
        setValues({...values, ...v});
        handleNext();
        // store.dispatch(addOrder(values));
        console.log(values);
    }

    const onMasterIdChange = ({row}) => {
        setValues({master_id: row.id, ...values})
        console.log(values);
    }

    const onChangeDatetime = (v) => {
        console.log(v);
        setValues({...values, ...v});
        console.log(values);
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    useEffect(() => {
        store.dispatch(getCities());
        store.dispatch(getMasters());
    }, [])

    const ActiveStep = () => {
        switch (activeStep) {
            case 0 : {
                return <CredentialsForm formId='form0' submitAction={onCredentialsChange}/>
            }
            case 1 : {
                return <ChooseMasterForm onMasterIdChange={onMasterIdChange}/>
            }
            case 2 : {
                return <DateTimeForm shiftTimeStart={shiftTimeStart} shiftTimeEnd={shiftTimeEnd}
                                     master_id={values.master_id} onChangeDatetime={onChangeDatetime}/>
            }
        }
    }

    const ActiveButton = () => {
        switch (activeStep) {
            case 0: {
                return <Button type='submit' form='form0'>Далее</Button>
            }
            case 1: {
                return <Button onClick={handleNext}>Далее</Button>
            }
            default: {
                return <></>
            }
        }
    }

    return (
        <>
            <FormDialog
                autoGenerateSubmitButton={false}
                openDialogButtonText={openButtonOnClickText}
                dialogTitle='Введите данные чтобы заказать мастера'
                additionalButtons={<ActiveButton/>}
            >
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
                                <div style={{height: '400px'}}>
                                    <ActiveStep/>
                                </div>
                            )
                    }
                </Box>
            </FormDialog>
        </>
    )
}

export default OrderForm;