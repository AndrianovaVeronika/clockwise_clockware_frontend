import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const OrderSuccessAlertDialog = () => {
    const navigate = useNavigate();

    return (
        <>
            <Dialog open={true}>
                <DialogTitle>Order have been created successfully</DialogTitle>
                <DialogContent>
                    <Typography>Please check your email for your order details.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        navigate('/');
                    }}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderSuccessAlertDialog;