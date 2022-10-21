import React, {useState} from 'react';
import {Form, Formik} from "formik";
import {Alert, AlertTitle, Paper} from "@mui/material";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import useStyles from "../../../../styles/useStyles";
import FormikTextField from "../../FormsComponents/FormikTextField";
import {useTranslation} from "react-i18next";

const initialValues = {name: ''};

const CityForm = ({specifiedInitialValues, submitAction, formId, setDataTableAlert, clearDataTableSelectedRow}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const styles = useStyles();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, t("forms.validationErrors.shortName")).required(t("forms.validationErrors.required")),
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {
            error,
            payload
        } = await dispatch(submitAction(specifiedInitialValues ? {id: specifiedInitialValues?.id, ...values} : values));
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
            if (setDataTableAlert) {
                setDataTableAlert(
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        {'Row has been added/updated successfully.'}
                    </Alert>
                );
            }
        }
    }

    return (
        <>
            <Paper elevation={0} className={styles.formPaper}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema}
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
                            </Form>
                        )
                    }
                </Formik>
                {Error}
            </Paper>
        </>
    )
}

export default CityForm;