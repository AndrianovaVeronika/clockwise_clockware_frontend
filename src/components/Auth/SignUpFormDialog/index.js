import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {signUp} from "../../../store/actions";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField} from "@mui/material";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Link as RouterLink} from "react-router-dom";
import React from "react";

const initialValues = {
    username: '',
    email: '',
    password: ''
};

const SignUpFormDialog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const paperStyle = {padding: '10px 10px', width: '90%', margin: '10px auto'}

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
        email: Yup.string().email('email is not valid')
    })

    const onSubmit = async (values, props) => {
        await dispatch(signUp(values));
        navigate('/profile');
    }

    return (
        <Dialog open={true}>
            <DialogTitle>Введите свое имя и пароль</DialogTitle>
            <DialogContent>
                <Paper elevation={0} style={paperStyle}>
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
                                    />
                                </Form>
                            )
                        }
                    </Formik>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button
                    {...{
                        to: '/',
                        component: RouterLink
                    }}>Отмена</Button>
                <Button
                    type='submit'
                    form='signup-form'
                >Войти</Button>
            </DialogActions>
        </Dialog>
    )
}

export default SignUpFormDialog;