import React, {useState} from "react";
import {useDispatch} from "react-redux";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {updateCredentials} from "../../../../store/actions/auth";
import {Alert, AlertTitle, Snackbar} from "@mui/material";
import {useTranslation} from "react-i18next";

const initialValues = {
    password: '',
    confirmPassword: '',
    currentPassword: ''
}

const ResetPasswordForm = ({closeAction}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const [Error, setError] = useState(<></>);
    // const [open, setOpen] = React.useState(false);

    // const onClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }
    //     setOpen(false);
    // };

    const onSubmit = async ({password, currentPassword}) => {
        const {error, payload} = await dispatch(updateCredentials({password, currentPassword}));

        if (error) {
            setError(
                <Snackbar open={true} autoHideDuration={6000} /*onClose={onClose}*/>
                    <Alert severity="error" key={payload.message}>
                        <AlertTitle>Error</AlertTitle>
                        {payload.message}
                    </Alert>
                </Snackbar>
            );
            // setOpen(true);
        } else {
            setError(<></>);
            closeAction();
        }
    };

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().min(8, t("forms.validationErrors.shortPassword"))
            .required(t("forms.validationErrors.required")),
        password: Yup.string().min(8, t("forms.validationErrors.shortPassword"))
            .required(t("forms.validationErrors.required"))
            .when(["currentPassword"], (curr, schema) => {
                return schema.notOneOf([curr], t("forms.validationErrors.passwordEquals"));
            }),
        confirmPassword: Yup.string().min(8, t("forms.validationErrors.shortPassword"))
            .required(t("forms.validationErrors.required"))
            .oneOf([Yup.ref('password'), null], t("forms.validationErrors.notMatchPassword"))
    });

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form id='reset-password-form'>
                            <FormikPasswordField
                                label={t("forms.labels.currentPassword")}
                                name='currentPassword'
                                error={props.errors.currentPassword && props.touched.currentPassword}
                                required
                            />
                            <FormikPasswordField
                                label={t("forms.labels.password")}
                                name='password'
                                error={props.errors.password && props.touched.password}
                                required
                            />
                            <FormikPasswordField
                                label={t("forms.labels.confirmPassword")}
                                name='confirmPassword'
                                error={props.errors.confirmPassword && props.touched.confirmPassword}
                                required
                            />
                        </Form>
                    )
                }
            </Formik>
            {Error}
        </>
    )
};

export default ResetPasswordForm;