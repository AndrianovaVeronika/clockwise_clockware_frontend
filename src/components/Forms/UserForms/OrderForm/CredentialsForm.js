import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {useTranslation} from "react-i18next";
import {getAllClockTypes} from "../../../../store/getters/clockTypes";
import {getAllCities} from "../../../../store/getters/cities";

const CredentialsForm = ({formId, submitAction, values}) => {
    const {t} = useTranslation();

    const [clockTypesOptions, setClockTypesOptions] = useState([]);
    const [citiesOptions, setCitiesOptions] = useState([]);
    useEffect(async () => {
        const clockTypes = await getAllClockTypes();
        setClockTypesOptions(clockTypes.map(clockType => ({
            key: clockType.id,
            value: t(`clockTypes.${clockType.name}`)
        })));
        const cities = await getAllCities();
        setCitiesOptions(cities.map(city => ({
            key: city.id,
            value: city.name
        })));
    }, []);

    const initialValues = values ? values : {
        cityId: '',
        clockTypeId: ''
    }

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
                    options={clockTypesOptions}
                    required
                />
                <FormikSelectField
                    label={t("forms.labels.city")}
                    name='cityId'
                    options={citiesOptions}
                    required
                />
            </Form>)}
        </Formik>
    )
}

export default CredentialsForm;