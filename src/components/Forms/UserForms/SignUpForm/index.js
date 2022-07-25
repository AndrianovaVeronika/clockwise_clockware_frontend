import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Alert, AlertTitle, Button, Paper} from "@mui/material";
import {Form, Formik} from "formik";
import React, {useState} from "react";
import useStyles from "../../../../styles/useStyles";
import {signUp} from "../../../../store/actions/auth";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";

const initialValues = {
    username: "",
    email: "",
    password: ""
};

const SignUpForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
    });

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(signUp(values));
        setError(
            <Alert severity="error" key={payload.message}>
                <AlertTitle>Error</AlertTitle>
                {payload.message}
            </Alert>
        );
        if (!error) {
            setError(<></>);
            navigate('/user/success');
        }
    };

    return (
        <>
            <Paper elevation={3} className={classes.formPaper}>
                <Formik initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id='signup-form'>
                                <FormikTextField
                                    label='Username'
                                    name='username'
                                    error={props.errors.username && props.touched.username}
                                    required
                                />
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
                        form='signup-form'
                    >Submit</Button>
                </div>
                {Error}
            </Paper>
        </>
    )
}

export default SignUpForm;