import React from "react";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import {Form, Formik} from "formik";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {getClockTypesSelector} from "../../../../store/selectors/clockTypesSelector";
import {useTranslation} from "react-i18next";

const CredentialsForm = ({formId, submitAction, values}) => {
    const cities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);
    const {t} = useTranslation();

    const initialValues = values ? values : {
        cityId: '',
        clockTypeId: ''
    }

    const getCities = () => {
        const elements = [];
        for (const city of cities) {
            elements.push({key: city.id, value: city.name});
        }
        return elements;
    }

    const getClockTypes = () => {
        const types = [];
        for (const type of clockTypes) {
            types.push({key: type.id, value: t("clockTypes" + type.name)});
        }
        return types;
    }

    const cityOptions = getCities();
    const clockTypeOptions = getClockTypes();

    const onSubmit = (v, props) => {
        submitAction(v);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >{(props) => (
            <Form id={formId}>
                <FormikSelectField
                    label={t("forms.labels.clockType")}
                    name='clockTypeId'
                    options={clockTypeOptions}
                    required
                />
                <FormikSelectField
                    label={t("forms.labels.city")}
                    name='cityId'
                    options={cityOptions}
                    required
                />
            </Form>)}
        </Formik>
    )
}

export default CredentialsForm;