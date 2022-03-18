import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {logOut} from "../../../store/actions/auth";
import {useDispatch} from "react-redux";

const LogoutAlertDialog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <Dialog open={true}>
                <DialogTitle>Attention!</DialogTitle>
                <DialogContent>
                    <Typography>Are you sure you want to log out?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> {
                        navigate('/profile');
                    }}>Cancel</Button>
                    <Button onClick={() => {
                        dispatch(logOut());
                        navigate('/');
                    }}>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LogoutAlertDialog;