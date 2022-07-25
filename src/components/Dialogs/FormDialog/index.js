import * as React from 'react';
import {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import CloseButton from "../../Forms/FormsComponents/CloseButton";
import {useSelector} from "react-redux";
import {getByIdSelectorCreator} from "../../../store/selectors/getByIdSelectorCreator";
import useStyles from "../../../styles/useStyles";

const FormDialog = ({
                        OpenButton,
                        dialogTitle,
                        submitButtonText,
                        ModelForm,
                        formId,
                        submitAction,
                        setDataTableAlert,
                        clearDataTableSelectedRow
                    }) => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open);
    };

    const onCancelAction = () => {
        toggle();
    }

    const formInitialValues = useSelector(getByIdSelectorCreator(formId));
    const classes = useStyles();
    return (
        <>
            <OpenButton onClick={toggle}/>
            <Dialog open={open} onClose={toggle}>
                <CloseButton onCancel={onCancelAction}/>
                <DialogTitle>
                    {dialogTitle}
                </DialogTitle>
                <DialogContent className={classes.dialog}>
                    <ModelForm
                        submitAction={submitAction}
                        specifiedInitialValues={formInitialValues}
                        formId={formId}
                        setDataTableAlert={setDataTableAlert}
                        clearDataTableSelectedRow={clearDataTableSelectedRow}
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