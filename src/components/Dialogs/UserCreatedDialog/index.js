import React from "react";
import {Button, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import PopupDialog from "../PopupDialog";

const UserCreatedDialog = ({display, onClose}) => {
    const navigate = useNavigate();

    return (
        <>
            <PopupDialog
                open={display}
                onClose={onClose}
                dialogTitleText='Success!'
                Content={<Typography>Account registered successfully!</Typography>}
                Actions={<>
                    <Button onClick={() => {
                        navigate('/login');
                    }}>Sign in</Button>
                    <Button onClick={() => {
                        navigate('/');
                    }}>Home</Button>
                </>}
            />
        </>
    )
}

export default UserCreatedDialog;