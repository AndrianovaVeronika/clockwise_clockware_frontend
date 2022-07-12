import React, {useState} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Alert, AlertTitle, Paper, TextField} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import useStyles from "../../../styles/useStyles";

const initialValues = {name: ''};

const CityForm = ({specifiedInitialValues, submitAction, formId, setDataTableAlert}) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues?.id, ...values} : values));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
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
                                <Field as={TextField}
                                       label='Name'
                                       name='name'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='name'/>}
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