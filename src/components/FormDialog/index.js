import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";

const FormDialog = ({
                        openDialogButtonText,
                        dialogTitle,
                        additionalButtons,
                        submitButtonParams,
                        cancelOnClick,
                        children
                    }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const {onSubmit, submitButtonText, show = true, ...params} = submitButtonParams;

    const onClick = () => {
        if (onSubmit) {
            onSubmit();
        }
        toggle();
    }

    return (
        <div>
            <Button variant="outlined" onClick={toggle}>
                {openDialogButtonText}
            </Button>
            <Dialog open={open} onClose={toggle}>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    {additionalButtons}
                    <Button onClick={() => {
                        cancelOnClick();
                        toggle();
                    }}>Отмена</Button>
                    {show && submitButtonParams &&
                    <Button
                        onClick={onClick}
                        {...params}
                    >{submitButtonText}</Button>}
                </DialogActions>
            </Dialog>
        </div>
    )
        ;
}

export default FormDialog;