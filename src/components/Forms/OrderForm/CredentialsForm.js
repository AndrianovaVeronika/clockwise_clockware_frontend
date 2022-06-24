import React from "react";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {Form, Formik} from "formik";
import FormSelect from "../FormSelect";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";
import {getOrderUserSelector} from "../../../store/selectors/authSelector";
import * as Yup from "yup";

const CredentialsForm = ({formId, submitAction, values}) => {
    const cities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);
    const user = useSelector(getOrderUserSelector);

    const initialValues = values ? {...values, userId: user.id} : {
        userId: user.id,
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

    const onSubmit = (v, props) => {
        submitAction({...v, userId: initialValues.userId});
    }

    return (
        <div style={{margin: '20px'}}>
            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
            >{(props) => (
                <Form id={formId}>
                    <FormSelect
                        label='Clock size'
                        name='clockTypeId'
                        options={clockTypeOptions}
                        required
                        fullWidth
                        style={{margin: '10px'}}
                    />
                    <FormSelect
                        label='City'
                        name='cityId'
                        options={cityOptions}
                        required
                        fullWidth
                        style={{margin: '10px'}}
                    />
                </Form>)}
            </Formik>
        </div>
    )
}

export default CredentialsForm;