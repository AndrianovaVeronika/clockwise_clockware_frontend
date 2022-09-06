import React from "react";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import {Form, Formik} from "formik";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {getClockTypesSelector} from "../../../../store/selectors/clockTypesSelector";

const CredentialsForm = ({formId, submitAction, values}) => {
    const cities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);

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
            types.push({key: type.id, value: type.name});
        }
        return types;
    }

    const cityOptions = getCities();
    const clockTypeOptions = getClockTypes();

    const onSubmit = async (v, props) => {
        submitAction(v);
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
        >{(props) => (
            <Form id={formId}>
                <FormikSelectField
                    label='Clock size'
                    name='clockTypeId'
                    options={clockTypeOptions}
                    required
                />
                <FormikSelectField
                    label='City'
                    name='cityId'
                    options={cityOptions}
                    required
                />
            </Form>)}
        </Formik>
    )
}

export default CredentialsForm;