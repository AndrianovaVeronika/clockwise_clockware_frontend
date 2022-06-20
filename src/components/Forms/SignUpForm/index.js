import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Box, Button, Paper, TextField} from "@mui/material";
import {ErrorMessage, Form, Formik} from "formik";
import React from "react";
import {FormField, useStyles} from "../styles";

const initialValues = {
    username: '',
    email: '',
    password: ''
};

const SignUpForm = ({submitAction, specifiedInitialValues, signup = false}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const styles = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        password: Yup.string().min(8, 'Password is too short'),
        email: Yup.string().email('email is not valid').required('Required')
    })

    const onSubmit = async (values, props) => {
        dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues.id, ...values} : values));
        if (signup) {
            navigate('/login');
        }
    }

    return (
        <Box>
            <Paper elevation={signup ? 3 : 0} className={styles.formPaper}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='signup-form'>
                                <FormField as={TextField}
                                           label='Username'
                                           name='username'
                                           fullWidth
                                           error={props.errors.name && props.touched.name}
                                           helperText={<ErrorMessage name='username'/>}
                                           required
                                />
                                <FormField as={TextField}
                                           label='Mail'
                                           name='email'
                                           error={props.errors.email && props.touched.email}
                                           helperText={<ErrorMessage name='email'/>}
                                           required
                                           fullWidth
                                />
                                <FormField as={TextField}
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
                {signup && <div className={styles.authFormButtons}>
                    <Button onClick={() => signup ? navigate('/') : navigate('/admin/users')}>Cancel</Button>
                    <Button
                        type='submit'
                        form='signup-form'
                    >Submit</Button>
                </div>}
            </Paper>
        </Box>
    )
}

export default SignUpForm;