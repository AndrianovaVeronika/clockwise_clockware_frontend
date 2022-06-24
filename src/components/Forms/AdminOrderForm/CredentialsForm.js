import React from "react";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {Form, Formik} from "formik";
import FormSelect from "../FormSelect";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";
import {getUsersSelector} from "../../../store/selectors/usersSelector";
import {isNumber} from "lodash";

const CredentialsForm = ({formId, submitAction, specifiedInitialValues}) => {
    const cities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);
    const user = useSelector(getCurrentUserSelector);
    const users = useSelector(getUsersSelector);

    const getInitValues = () => {
        if (specifiedInitialValues.userId === '') {
            return {
                userId: user.id,
                cityId: '',
                clockTypeId: ''
            }
        } else if (isNumber(specifiedInitialValues.userId)
            && isNumber(specifiedInitialValues.cityId)
            && isNumber(specifiedInitialValues.clockTypeId)) {
            return specifiedInitialValues;
        }
        return {
            cityId: cities.find(city => city.name === specifiedInitialValues.city)?.id,
            userId: users.find(user => user.username === specifiedInitialValues.username)?.id,
            clockTypeId: clockTypes.find(clockType => clockType.name === specifiedInitialValues.clockType)?.id,
        }
    }

    const values = getInitValues();

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
        submitAction({...v, userId: values.userId});
    }

    return (
        <div style={{margin: '20px'}}>
            {values.userId && (values.cityId || values.cityId === '') && (values.clockTypeId || values.clockTypeId === '') &&
            <Formik
                initialValues={values}
                onSubmit={onSubmit}
            >{(props) => (
                <Form id={formId}>
                    {/*<Field as={TextField}*/}
                    {/*       label='Имя'*/}
                    {/*       name='username'*/}
                    {/*       fullWidth*/}
                    {/*       disabled*/}
                    {/*/>*/}
                    {/*<Field as={TextField}*/}
                    {/*       label='Почта'*/}
                    {/*       name='email'*/}
                    {/*       fullWidth*/}
                    {/*       disabled*/}
                    {/*/>*/}
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
            </Formik>}
        </div>
    )
}

export default CredentialsForm;