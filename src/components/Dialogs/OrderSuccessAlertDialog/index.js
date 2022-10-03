import React from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import PopupDialog from "../PopupDialog";
import {useTranslation} from "react-i18next";

const OrderSuccessAlertDialog = ({display, onClose}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <PopupDialog
                open={display}
                onClose={onClose}
                dialogTitleText={t("alertDialogs.orderSuccess.title")}
                Content={<Typography>{t("alertDialogs.orderSuccess.text")}</Typography>}
                Actions={
                    <Button onClick={onClose}>{t("alertDialogs.orderSuccess.submitButton")}</Button>
                }
            />
        </>
    )
}

export default OrderSuccessAlertDialog;