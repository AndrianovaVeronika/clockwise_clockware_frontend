import React, {useEffect, useState} from 'react';
import './style.css';
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import CredentialsForm from "./CredentialsForm";
import {addOrder, getCities, getMasters} from "../../store/actions";
import DateTimePick from "./DateTimePick";
import MasterPick from "./MasterPick";
import FormDialog from "../FormDialog";
import ResultsReport from "./ResultsReport";
import {useDispatch} from "react-redux";

const initialValues = {
    name: '',
    login: '',
    clock_type: '',
    master_id: 0,
    city_id: 0,
    date: '',
    time: '',
}

const steps = ['Подробности заказа', 'Мастер', 'Дата и время', 'Проверьте данные'];

const shiftTimeStart = 10;
const shiftTimeEnd = 18;

const OrderForm = ({openButtonOnClickText}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCities());
        dispatch(getMasters());
    }, [dispatch]);

    const [values, setValues] = useState(initialValues);

    const onCredentialsChange = (v, props) => {
        setValues({...values, ...v});
        handleNext();
    }

    const onMasterIdChange = ({row}) => {
        setValues({...values, master_id: row.id})
    }

    const onChangeDatetime = (v) => {
        setValues({...values, ...v});
    }

    const onSubmit = () => {
        dispatch(addOrder(values));
    }

    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const ActiveStep = () => {
        switch (activeStep) {
            case 0 : {
                return <CredentialsForm formId='form0' submitAction={onCredentialsChange}/>
            }
            case 1 : {
                return <MasterPick onMasterIdChange={onMasterIdChange}/>
            }
            case 2 : {
                return <DateTimePick shiftTimeStart={shiftTimeStart} shiftTimeEnd={shiftTimeEnd}
                                     master_id={values.master_id} onChangeDatetime={onChangeDatetime}/>
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
            case steps.length - 1: {
                return <></>
            }
            default: {
                return <Button onClick={handleNext}>Далее</Button>
            }
        }
    }

    return (
        <>
            <FormDialog
                openDialogButtonText={openButtonOnClickText}
                dialogTitle='Введите данные чтобы заказать мастера'
                additionalButtons={<ActiveButton/>}
                cancelOnClick={() => setActiveStep(0)}
                submitButtonParams={{
                    onSubmit: onSubmit,
                    submitButtonText: 'Заказать',
                    show: activeStep === steps.length - 1
                }}
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