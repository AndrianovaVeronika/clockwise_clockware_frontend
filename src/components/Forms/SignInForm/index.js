import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Box, Button, Paper, TextField} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {signIn} from "../../../store/actions/auth";
import {useNavigate} from "react-router";

const initialValues = {
    username: '',
    password: ''
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required')
    })

    const onSubmit = async (values, props) => {
        await dispatch(signIn(values));
        navigate('/profile');
    }

    return (
        <Box>
            <Paper
                style={{
                    maxHeight: '200px',
                    maxWidth: '400px',
                    minHeight: '100px',
                    minWidth: '200px',
                    padding: '40px 30px',
                    margin: '10px auto',
                    flexDirection: 'column',
                }}
            >
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='auth-form'>
                                <Field as={TextField}
                                       label='Username'
                                       name='username'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='username'/>}
                                       required
                                />
                                <Field as={TextField}
                                       label='Password'
                                       name='password'
                                       type='password'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='password'/>}
                                       required
                                />
                            </Form>
                        )
                    }
                </Formik>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button onClick={() => navigate('/')}>Отмена</Button>
                    <Button
                        type='submit'
                        form='auth-form'
                    >Войти</Button>
                </div>
            </Paper>
        </Box>
    )
}

export default SignInForm;