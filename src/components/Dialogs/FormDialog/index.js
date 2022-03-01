import * as React from 'react';
import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

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

    const onSubmitAction = () => {
        if (onSubmit) {
            onSubmit();
        }
        toggle();
    }

    const onCancelAction = () => {
        if (cancelOnClick) {
            cancelOnClick();
        }
        toggle();
    }

    return (
        <>
            <Button style={{
                height: '50px',
                width: '120px',
                margin: '10px',
                borderRadius: '10px',
                padding: '18px 36px',
                fontSize: '16px',
                backgroundColor: '#2b2b2b',
                color: 'whitesmoke'
            }} variant="outlined" onClick={toggle}>
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
                    <Button onClick={onCancelAction}>Отмена</Button>
                    {show && submitButtonParams &&
                    <Button
                        onClick={onSubmitAction}
                        {...params}
                    >{submitButtonText}</Button>}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FormDialog;