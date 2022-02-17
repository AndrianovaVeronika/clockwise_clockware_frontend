import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, TextField} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {Link as RouterLink} from "react-router-dom";
import {signIn} from "../../store/actions";
import {useNavigate} from "react-router";

const initialValues = {
    username: '',
    password: ''
};

const AuthenticationFormDialog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const paperStyle = {padding: '10px 10px', width: '90%', margin: '10px auto'}

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required')
    })

    const onSubmit = async (values, props) => {
        await dispatch(signIn(values));
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
                    form='auth-form'
                    >Войти</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AuthenticationFormDialog;