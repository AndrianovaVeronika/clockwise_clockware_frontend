import React, {useEffect, useState} from 'react';
import './style.css';
import {
    Box, Button, Step, StepLabel, Stepper, Typography,
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
    city_id: '',
    date: moment().format('DD-MM-YYYY'),
    time: '',
}

const steps = ['Подробности заказа', 'Мастер', 'Дата и время'];

const shiftTimeStart = 10;
const shiftTimeEnd = 18;

const OrderForm = ({openButtonOnClickText}) => {

    const onSubmitStep = (values, props) => {
        console.log(values);
        // store.dispatch(addOrder(values));
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
                return <CredentialsForm formId='form0' submitAction={onSubmitStep}/>
            }
            case 1 : {
                return <ChooseMasterForm/>
            }
            case 2 : {
                // return <DateTimeForm/>
            }
        }
    }

    return (
        <>
            <FormDialog
                formId={'step' + activeStep}
                openDialogButtonText={openButtonOnClickText}
                dialogTitle='Введите данные чтобы заказать мастера'
                additionalButtons={
                    activeStep === steps.length ? <></> :
                        <Button type='submit' form={'form' + activeStep} onClick={handleNext}>Далее</Button>
                }
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