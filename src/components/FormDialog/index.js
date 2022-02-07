import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {useState} from "react";

const FormDialog = ({openDialogButtonText, dialogTitle, additionalButtons, submitButtonParams, children}) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const {onSubmit, submitButtonText, show, ...params} = submitButtonParams;

    const onClick = () => {
        if (onSubmit) {
            onSubmit();
        }
        toggle();
    }

    const SubmitButton = () => {
        if (submitButtonParams) {
            return <Button
                onClick={onClick}
                {...params}
            >{submitButtonText}</Button>;
        }
        return <></>;
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
                    <Button onClick={toggle}>Отмена</Button>
                    {show ? <SubmitButton/> : <></>}
                </DialogActions>
            </Dialog>
        </div>
    )
        ;
}

export default FormDialog;