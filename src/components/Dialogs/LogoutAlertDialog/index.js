import React, {useState} from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {logOut} from "../../../store/actions/auth";
import {useDispatch} from "react-redux";
import PopupDialog from "../../Dialogs/PopupDialog";
import {useTranslation} from "react-i18next";

const LogoutAlertDialog = ({openButtonText, OpenButtonType}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(true);
    }
    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <OpenButtonType onClick={onOpen}>{openButtonText}</OpenButtonType>
            <PopupDialog
                open={open}
                onClose={onClose}
                dialogTitleText={t("alertDialogs.logoutAtt.title")}
                Content={<Typography>{t("alertDialogs.logoutAtt.text")}</Typography>}
                Actions={
                    <Button onClick={() => {
                        dispatch(logOut());
                        navigate('/');
                    }}>{t("alertDialogs.logoutAtt.submitButton")}</Button>
                }
            />
        </>
    )
}

export default LogoutAlertDialog;