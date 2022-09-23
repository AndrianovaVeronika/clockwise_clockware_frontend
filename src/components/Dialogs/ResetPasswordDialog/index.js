import React, {useState} from "react";
import {Button} from "@mui/material";
import {useNavigate} from "react-router";
import PopupDialog from "../PopupDialog";
import ResetPasswordForm from "../../Forms/UserForms/ResetPasswordForm";

const ResetPasswordDialog = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const onOpen = () => {
        setOpen(true);
    }
    const onClose = () => {
        setOpen(false);
    }

    return (
        <>
            <Button onClick={onOpen}>Reset password</Button>
            <PopupDialog
                open={open}
                onClose={onClose}
                dialogTitleText='Enter new password and confirm'
                Content={<ResetPasswordForm closeAction={onClose}/>}
                Actions={
                    <Button
                        type='submit'
                        form='reset-password-form'
                    >Confirm</Button>
                }
            />
        </>
    )
}

export default ResetPasswordDialog;