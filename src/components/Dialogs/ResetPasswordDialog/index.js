import React, {useState} from "react";
import {Button} from "@mui/material";
import PopupDialog from "../PopupDialog";
import ResetPasswordForm from "../../Forms/UserForms/ResetPasswordForm";
import {useTranslation} from "react-i18next";

const ResetPasswordDialog = () => {
    const {t} = useTranslation();

    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(true);
    }
    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button onClick={onOpen}>{t("forms.resetPassword.openButton")}</Button>
            <PopupDialog
                open={open}
                onClose={onClose}
                dialogTitleText={t("forms.resetPassword.title")}
                Content={<ResetPasswordForm closeAction={onClose}/>}
                Actions={
                    <Button
                        type='submit'
                        form='reset-password-form'
                    >{t("forms.resetPassword.confirmButton")}</Button>
                }
            />
        </>
    )
}

export default ResetPasswordDialog;