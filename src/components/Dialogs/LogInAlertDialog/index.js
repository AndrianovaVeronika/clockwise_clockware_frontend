import React, {useState} from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import PopupDialog from "../PopupDialog";

const LoginAlertDialog = ({display, onClose}) => {
    const navigate = useNavigate();

    return (
        <>
            <PopupDialog
                open={display}
                onClose={onClose}
                dialogTitleText='Error!'
                Content={<Typography>You need to log in and prove your email before placing new order on your account!</Typography>}
                Actions={<Button onClick={() => {navigate('/login');}}>Log in</Button>}
            />
        </>
    )
}

export default LoginAlertDialog;