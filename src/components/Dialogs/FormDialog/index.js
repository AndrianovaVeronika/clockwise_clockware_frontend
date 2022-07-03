import * as React from 'react';
import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import CloseButton from "../../Forms/CloseButton";

const FormDialog = ({
                        openDialogButtonText,
                        dialogTitle,
                        submitButtonParams,
                        cancelOnClick,
                        OpenButton,
                        children
                    }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const {onSubmit, submitButtonText, ...params} = submitButtonParams;

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

    const OpenFormButton = () => {
        if (OpenButton) {
            return <OpenButton onClick={toggle}/>;
        }

        return <Button style={{
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
    }

    return (
        <>
            {<OpenFormButton/>}
            <Dialog open={open} onClose={toggle}>
                <CloseButton onCancel={onCancelAction}/>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button
                        type='submit'
                        onClick={onSubmitAction}
                        {...params}
                    >{submitButtonText}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FormDialog;