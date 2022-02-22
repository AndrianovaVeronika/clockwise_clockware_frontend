import React from "react";
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {Form, Formik} from "formik";
import FormSelect from "../FormSelect";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";

const CredentialsForm = ({formId, submitAction}) => {
    const incomeCities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);
    const user = useSelector(getCurrentUserSelector);

    const initialValues = {
        // username: user.username,
        // email: user.email,
        clockTypeId: '',
        cityId: '',
    }

    const getCities = () => {
        const cities = [];
        for (const city of incomeCities) {
            cities.push({key: city.id, value: city.name});
        }
        return cities;
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
        submitAction({...v, userId: user.id});
    }

    return (
        <>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                                />
                                <FormSelect
                                    label='Город'
                                    name='cityId'
                                    options={cityOptions}
                                    required
                                    fullWidth
                                />
                            </Form>
                        )
                    }
                </Formik>
            </Box>
        </>
    )
}

export default CredentialsForm;