import React from "react";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {Form, Formik} from "formik";
import FormSelect from "../FormSelect";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";
import {getUsersSelector} from "../../../store/selectors/usersSelector";

const CredentialsForm = ({formId, submitAction, initialValues}) => {
    const cities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);
    const user = useSelector(getCurrentUserSelector);
    const users = useSelector(getUsersSelector);

    const getInitValues = () => {
        if (initialValues.userId === '') {
            return {
                ...initialValues,
                userId: user.id
            }
        }

        const v = {
            cityId: cities.find(city => city.name === initialValues.cityId)?.id,
            userId: users.find(user => user.username === initialValues.userId)?.id,
            clockTypeId: clockTypes.find(clockType => clockType.name === initialValues.clockTypeId)?.id,
        };
        console.log('v', v)
        return v;
    }

    const values = getInitValues();

    console.log('credentials', values)

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
            <Formik
                initialValues={values}
                onSubmit={onSubmit}
            >
                {
                    (props) => (
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
                                label='Размер часов'
                                name='clockTypeId'
                                options={clockTypeOptions}
                                required
                                fullWidth
                                style={{margin: '10px'}}
                            />
                            <FormSelect
                                label='Город'
                                name='cityId'
                                options={cityOptions}
                                required
                                fullWidth
                                style={{margin: '10px'}}
                            />
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default CredentialsForm;