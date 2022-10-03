import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Alert, AlertTitle} from "@mui/material";
import {Form, Formik} from "formik";
import React from "react";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";
import {registerUserAccount} from "../../../../store/actions/auth";
import {useTranslation} from "react-i18next";

const initialValues = {
    name: "",
    email: "",
    password: ""
};

const UserSignUpForm = ({setError}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, t("forms.validationErrors.shortName"))
            .required(t("forms.validationErrors.required")),
        email: Yup.string().email(t("forms.validationErrors.emailNotValid"))
            .required(t("forms.validationErrors.required")),
        password: Yup.string().min(8, t("forms.validationErrors.shortPassword"))
            .required(t("forms.validationErrors.required")),
    });

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(registerUserAccount(values));
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
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form id='signup-form'>
                            <FormikTextField
                                label={t("forms.labels.name")}
                                name='name'
                                error={props.errors.name && props.touched.name}
                                required
                            />
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
        </>
    )
}

export default UserSignUpForm;