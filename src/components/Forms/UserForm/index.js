import {ErrorMessage, Field, Form, Formik} from "formik";
import {Paper, TextField} from "@mui/material";
import React from "react";
import * as Yup from "yup";
import {signUp} from "../../../store/actions/auth";
import {useDispatch} from "react-redux";

const initialValues = {
    username: '',
    email: '',
    password: ''
};
const AddUserForm = ({specifiedInitialValues, submitAction}) => {
    const dispatch = useDispatch();

    const paperStyle = {padding: '10px 10px', width: '90%', margin: '10px auto'}

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
        email: Yup.string().email('email is not valid')
    })

    const onSubmit = async (values, props) => {
        await dispatch(submitAction(values));
    }

    return (
        <>
            <Paper elevation={0} style={paperStyle}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='user-form'>
                                <Field as={TextField}
                                       label='Username'
                                       name='username'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='username'/>}
                                       required
                                />
                                <Field as={TextField}
                                       label='Почта'
                                       name='email'
                                       error={props.errors.email && props.touched.email}
                                       helperText={<ErrorMessage name='email'/>}
                                       required
                                       fullWidth
                                />
                                <Field as={TextField}
                                       label='Password'
                                       name='password'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='password'/>}
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

export default AddUserForm;