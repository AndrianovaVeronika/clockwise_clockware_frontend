import React, {useState} from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {logOut} from "../../../store/actions/auth";
import {useDispatch} from "react-redux";
import PopupDialog from "../../Dialogs/PopupDialog";

const LogoutAlertDialog = ({openButtonText, OpenButtonType}) => {
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
                dialogTitleText='Attention!'
                Content={<Typography>Are you sure you want to log out?</Typography>}
                Actions={
                    <Button onClick={() => {
                        dispatch(logOut());
                        navigate('/');
                    }}>Ok</Button>
                }
            />
        </>
    )
}

export default LogoutAlertDialog;