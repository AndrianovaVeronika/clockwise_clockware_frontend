import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {signUp} from "../../../store/actions";
import {Box, Button, Paper, TextField} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import React from "react";

const initialValues = {
    username: '',
    email: '',
    password: ''
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
        email: Yup.string().email('email is not valid')
    })

    const onSubmit = async (values, props) => {
        await dispatch(signUp(values));
        navigate('/login');
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
                            <Form id='signup-form'>
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
                                       type="password"
                                />
                            </Form>
                        )
                    }
                </Formik>
                <div style={{justifyContent: 'flex-end'}}>
                    <Button
                        {...{
                            to: '/',
                            component: RouterLink
                        }}>Отмена</Button>
                    <Button
                        type='submit'
                        form='signup-form'
                    >Отправить</Button>
                </div>
            </Paper>
        </Box>
    )
}

export default SignUpForm;