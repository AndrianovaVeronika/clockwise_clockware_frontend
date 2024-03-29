import {useDispatch} from "react-redux";
import * as Yup from "yup";
import {Alert, AlertTitle, Box, Paper} from "@mui/material";
import {Form, Formik} from "formik";
import React, {useState} from "react";
import useStyles from "../../../../styles/useStyles";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";
import {useTranslation} from "react-i18next";

const UserForm = ({submitAction, specifiedInitialValues, formId, setDataTableAlert, clearDataTableSelectedRow}) => {
    const {t}=useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, t("forms.validationErrors.shortName")).required(t("forms.validationErrors.required")),
        password: Yup.string().min(8, t("forms.validationErrors.shortPassword")),
        email: Yup.string().email(t("forms.validationErrors.emailNotValid")).required(t("forms.validationErrors.required"))
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {
            error,
            payload
        } = await dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues.id, ...values} : values));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
            if (clearDataTableSelectedRow) {
                clearDataTableSelectedRow();
            }
            setDataTableAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {'Row has been added/updated successfully.'}
                </Alert>
            );
        }
    }

    const initialValues = specifiedInitialValues || {
        name: '',
        email: '',
        password: ''
    };

    return (
        <Box>
            <Paper elevation={0} className={classes.formPaper}>
                <Formik initialValues={initialValues} validationSchema={validationSchema}
                        onSubmit={onSubmit}>
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
                                <FormikPasswordField
                                    label={t("forms.labels.password")}
                                    name='password'
                                    error={props.errors.password && props.touched.password}
                                />
                            </Form>
                        )
                    }
                </Formik>
                {Error}
            </Paper>
        </Box>
    )
}

export default UserForm;