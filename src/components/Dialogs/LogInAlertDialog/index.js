import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const LogoutAlertDialog = () => {
    const navigate = useNavigate();

    return (
        <>
            <Dialog open={true}>
                <DialogTitle>Error!</DialogTitle>
                <DialogContent>
                    <Typography>You need to log in before placing new order on your account!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        navigate(-1);
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        navigate('/login');
                    }}>Log in</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LogoutAlertDialog;