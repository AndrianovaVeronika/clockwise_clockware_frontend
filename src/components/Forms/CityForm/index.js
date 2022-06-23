import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Paper, TextField} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import useStyles from "../../../styles/useStyles";

const initialValues = {name: ''};

const CityForm = ({specifiedInitialValues, submitAction}) => {
    const dispatch = useDispatch();
    const styles = useStyles();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const onSubmit = (values, props) => {
        dispatch(submitAction(specifiedInitialValues? {id: specifiedInitialValues?.id, ...values} : values));
    }

    return (
        <>
            <Paper elevation={0} className={styles.formPaper}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='city-form'>
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
            </Paper>
        </>
    )
}

export default CityForm;