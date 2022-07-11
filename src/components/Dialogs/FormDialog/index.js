import * as React from 'react';
import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import CloseButton from "../../Forms/CloseButton";
import ErrorListener from "../../PageComponents/ErrorListener";

const FormDialog = ({
                        OpenButton,
                        dialogTitle,
                        submitButtonText,
                        formId,
                        children
                    }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
        console.log('toggled')
    };

    const onCancelAction = () => {
        toggle();
    }

    return (
        <>
            <OpenButton onClick={toggle}/>
            <Dialog open={open} onClose={toggle}>
                <CloseButton onCancel={onCancelAction}/>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent>
                    {children}
                    <ErrorListener objType={formId}/>
                </DialogContent>
                <DialogActions>
                    <Button
                        type='submit'
                        form={formId}
                    >{submitButtonText}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default FormDialog;