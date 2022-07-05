import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import CloseButton from "../../Forms/CloseButton";
import {useDispatch} from "react-redux";
import {getCities} from "../../../store/actions/cities";
import {getClockTypes} from "../../../store/actions/clockTypes";
import useStyles from "../../../styles/useStyles";
import AdminOrderForm from "./AdminOrderForm";

const OrderFormDialog = ({OpenButton, specifiedInitialValues, submitAction}) => {
    console.log('initial values specified')
    console.log(specifiedInitialValues)

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
        dispatch(getClockTypes());
    }, [dispatch]);

    // returns all hours available within a day

    const onSubmit = (values, props) => {
        dispatch(submitAction(values));
    }

    return (
        <>
            <OpenButton onClick={handleOpen}/>
            <Dialog open={open}>
                <CloseButton onCancel={handleClose}/>
                <DialogTitle>Введите данные</DialogTitle>
                <DialogContent>
                    <AdminOrderForm onSubmit={onSubmit} specifiedInitialValues={specifiedInitialValues}/>
                </DialogContent>
                <DialogActions>
                    <Button type='submit' form='order-form'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default React.memo(OrderFormDialog);