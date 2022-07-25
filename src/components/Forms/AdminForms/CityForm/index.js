import React, {useState} from 'react';
import {ErrorMessage, Form, Formik} from "formik";
import {Alert, AlertTitle, Paper} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import useStyles from "../../../../styles/useStyles";
import FormikTextField from "../../FormsComponents/FormikTextField";

const initialValues = {name: ''};

const CityForm = ({specifiedInitialValues, submitAction, formId, setDataTableAlert, clearDataTableSelectedRow}) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {
            error,
            payload
        } = await dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues?.id, ...values} : values));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
            if (clearDataTableSelectedRow) {
                clearDataTableSelectedRow();
            }
            setDataTableAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {'Row has been added/updated successfully.'}
                </Alert>
            );
        }
    }

    return (
        <>
            <Paper elevation={0} className={styles.formPaper}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id={formId}>
                                <FormikTextField
                                    label='Name'
                                    name='name'
                                    error={props.errors.name && props.touched.name}
                                    required
                                />
                            </Form>
                        )
                    }
                </Formik>
                {Error}
            </Paper>
        </>
    )
}

export default CityForm;