import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {Alert, AlertTitle, Box, Button, Paper} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {signIn} from "../../../../store/actions/auth";
import {useNavigate} from "react-router";
import useStyles from "../../../../styles/useStyles";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField"

const initialValues = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is not valid').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required')
    });

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(signIn(values));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
        }
    }

    return (
        <Box>
            <Paper className={classes.formPaper}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='signin-form'>
                                <FormikTextField
                                    label='Email'
                                    name='email'
                                    error={props.errors.email && props.touched.email}
                                    required
                                />
                                <FormikPasswordField
                                    label='Password'
                                    name='password'
                                    error={props.errors.password && props.touched.password}
                                    required
                                />
                            </Form>
                        )
                    }
                </Formik>
                <div className={classes.authFormButtons}>
                    <Button onClick={() => navigate('/')}>Cancel</Button>
                    <Button
                        type='submit'
                        form='signin-form'
                    >Sign in</Button>
                </div>
                {Error}
            </Paper>
        </Box>
    )
}

export default SignInForm;