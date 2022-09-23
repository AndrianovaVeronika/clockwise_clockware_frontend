import React from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import PopupDialog from "../PopupDialog";

const OrderSuccessAlertDialog = ({display, onClose}) => {
    const navigate = useNavigate();

    return (
        <>
            <PopupDialog
                open={display}
                onClose={onClose}
                dialogTitleText='Order have been created successfully'
                Content={<Typography>Please check your email for your order details.</Typography>}
                Actions={
                    <Button onClick={onClose}>Ok</Button>
                }
            />
        </>
    )
}

export default OrderSuccessAlertDialog;