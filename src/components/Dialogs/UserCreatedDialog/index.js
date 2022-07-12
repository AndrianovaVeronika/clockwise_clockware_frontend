import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {useNavigate} from "react-router";

const UserCreatedDialog = () => {
    const navigate = useNavigate();

    return (
        <>
            <Dialog open={true}>
                <DialogTitle>Success!</DialogTitle>
                <DialogContent>
                    <Typography>User created successfully!</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=> {
                        navigate('/login');
                    }}>Sign in</Button>
                    <Button onClick={()=> {
                        navigate('/');
                    }}>Home</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserCreatedDialog;