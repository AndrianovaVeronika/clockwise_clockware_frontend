import {Form, Formik} from "formik";
import React from "react";
import useStyles from "../../../../styles/useStyles";
import * as Yup from "yup";
import FormikTextField from "../../FormsComponents/FormikTextField";
import {isUserCreated} from "../../../../store/actions/auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {useTranslation} from "react-i18next";

const LoginOrSignup = ({formId, onSubmit, values, currentUser}) => {
    const {t} = useTranslation();
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialValues = {
        name: values?.name || currentUser.name || '',
        email: values?.email || currentUser.email || ''
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, t("forms.validationErrors.shortName"))
            .required(t("forms.validationErrors.required")),
        email: Yup.string().email(t("forms.validationErrors.emailNotValid"))
            .required(t("forms.validationErrors.required"))
    });

    const submitAction = async (v) => {
        const {error, payload} = await dispatch(isUserCreated(v));
        if (error) {
            onSubmit(v, payload);
        } else {
            onSubmit(v);
        }
    };

    return (
        <>
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={submitAction}>
                {
                    (props) => (
                        <Form id={formId}>
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
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default LoginOrSignup;