import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CloseButton from "../../Forms/CloseButton";
import {useDispatch} from "react-redux";
import {getCities} from "../../../store/actions/cities";
import {getMasters} from "../../../store/actions/masters";
import {getClockTypes} from "../../../store/actions/clockTypes";
import useStyles from "../../../styles/useStyles";
import FirstStep from "./FirstStep";

const OrderFormDialog = ({OpenButton, specifiedInitialValues, submitAction}) => {
    //dialog
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    //form
    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        dispatch(getCities());
        dispatch(getMasters());
        dispatch(getClockTypes());
    }, [dispatch]);

    // returns all hours available within a day

    const onSubmit = (values, props) => {
        dispatch(submitAction(values));
        props.preventDefault();
    }

    // //steps
    // const [activeStep, setActiveStep] = useState(0);
    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => {
    //         if (prevActiveStep === 2) {
    //             dispatch(getAvailableMasters(values));
    //         }
    //         return prevActiveStep + 1;
    //     });
    // };
    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
    //
    // const ActiveStep = () => {
    //     switch (activeStep) {
    //         case 0 : {
    //             return <FirstStep
    //                 formId='form0'
    //                 submitAction={onFormSubmit}
    //                 values={values}
    //             />
    //         }
    //         case 1 : {
    //             return <SecondStep
    //                 formId='form2'
    //                 submitAction={onFormSubmit}
    //                 values={values}
    //             />
    //         }
    //         default:
    //             return;
    //     }
    // }

    return (
        <>
            <OpenButton onClick={handleOpen}/>
            <Dialog open={open}>
                <CloseButton onCancel={handleClose}/>
                <DialogTitle>Введите данные</DialogTitle>
                <DialogContent>
                    <FirstStep onSubmit={onSubmit} specifiedInitialValues={specifiedInitialValues}/>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' form='order-form'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default React.memo(OrderFormDialog);