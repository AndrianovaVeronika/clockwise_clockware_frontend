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
import {useTranslation} from "react-i18next";

const initialValues = {
    email: '',
    password: ''
};

const SignInForm = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        email: Yup.string().email(t("forms.validationErrors.emailNotValid")).required(t("validationErrors.required")),
        password: Yup.string().min(8, t("forms.validationErrors.shortPassword")).required(t("validationErrors.required"))
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
            navigate('/');
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
                                    label={t("forms.labels.email")}
                                    name='email'
                                    error={props.errors.email && props.touched.email}
                                    required
                                />
                                <FormikPasswordField
                                    label={t("forms.labels.password")}
                                    name='password'
                                    error={props.errors.password && props.touched.password}
                                    required
                                />
                            </Form>
                        )
                    }
                </Formik>
                <div className={classes.authFormButtons}>
                    <Button onClick={() => navigate('/')}>{t("forms.signInForm.cancelButton")}</Button>
                    <Button
                        type='submit'
                        form='signin-form'
                    >{t("forms.signInForm.submitButton")}</Button>
                </div>
                {Error}
            </Paper>
        </Box>
    )
}

export default SignInForm;