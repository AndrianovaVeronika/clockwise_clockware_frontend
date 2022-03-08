import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Paper, TextField} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";

const initialValues = {name: ''};

const CityForm = ({specifiedInitialValues, submitAction}) => {
    const dispatch = useDispatch();

    const paperStyle = {padding: '10px 10px', width: '90%', margin: '10px auto'}

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const onSubmit = (values, props) => {
        dispatch(submitAction(values));
        props.resetForm();
    }

    return (
        <>
            <Paper elevation={0} style={paperStyle}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form className='cityForm' id='city-form'>
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