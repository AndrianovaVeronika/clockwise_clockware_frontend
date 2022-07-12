import * as React from 'react';
import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import CloseButton from "../../Forms/CloseButton";

const FormDialog = ({
                        OpenButton,
                        dialogTitle,
                        submitButtonText,
                        formId,
                        ModelForm,
                        submitAction,
                        specifiedInitialValues,
                        setDataTableAlert
                    }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
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
                    <ModelForm
                        formId={formId}
                        submitAction={submitAction}
                        specifiedInitialValues={specifiedInitialValues}
                        setDataTableAlert={setDataTableAlert}
                    />
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