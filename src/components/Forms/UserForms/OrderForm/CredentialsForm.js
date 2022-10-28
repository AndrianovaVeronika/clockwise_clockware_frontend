import React from "react";
import {Form, Formik} from "formik";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {useTranslation} from "react-i18next";

const CredentialsForm = ({formId, submitAction, values, clockTypesOptions, citiesOptions}) => {
    const {t} = useTranslation();

    const initialValues = values ? values : {
        cityId: '',
        clockTypeId: ''
    }

    const onSubmit = (formValues, props) => {
        submitAction(formValues);
    }

    return (<>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >{(props) => (
                <Form id={formId}>
                    <FormikSelectField
                        label={t("forms.labels.clockType")}
                        name='clockTypeId'
                        options={clockTypesOptions}
                        required
                    />
                    <FormikSelectField
                        label={t("forms.labels.city")}
                        name='cityId'
                        options={citiesOptions}
                        required
                    />
                </Form>
            )}</Formik>
        </>
    )
}

export default CredentialsForm;