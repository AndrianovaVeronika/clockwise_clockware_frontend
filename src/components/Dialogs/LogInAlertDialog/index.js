import React, {useState} from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import PopupDialog from "../PopupDialog";
import {useTranslation} from "react-i18next";

const LoginAlertDialog = ({display, onClose}) => {
    const navigate = useNavigate();
    const {t} = useTranslation();

    return (
        <>
            <PopupDialog
                open={display}
                onClose={onClose}
                dialogTitleText={t("alertDialogs.loginErr.title")}
                Content={<Typography>{t("alertDialogs.loginErr.text")}</Typography>}
                Actions={<Button onClick={() => {navigate('/login');}}>{t("alertDialogs.loginErr.loginButton")}</Button>}
            />
        </>
    )
}

export default LoginAlertDialog;