import React from "react";
import {Box, TextField} from "@mui/material";
import * as Yup from 'yup';
import {useSelector} from "react-redux";
import {getCitiesSelector} from "../../store/selectors/citiesSelector";
import {ErrorMessage, Field, Form, Formik} from "formik";
import FormSelect from "../FormSelect";
import {getClockTypesSelector} from "../../store/selectors/clockTypesSelector";

const initialValues = {
    name: '',
    login: '',
    clock_type: '',
    city_id: '',
}

const CredentialsForm = ({formId, submitAction}) => {
    const incomeCities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);

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

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
        login: Yup.string().email('email is not valid'),
        // clockType: Yup.string().required('Required'),
        // city_id: Yup.number().required('Required'),
    })

    return (
        <>
            <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitAction}>
                    {
                        (props) => (
                            <Form id={formId}>
                                <Field as={TextField}
                                       label='Имя'
                                       name='name'
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='name'/>}
                                       required
                                       fullWidth
                                />
                                <Field as={TextField}
                                       label='Логин'
                                       name='login'
                                       error={props.errors.login && props.touched.login}
                                       helperText={<ErrorMessage name='login'/>}
                                       required
                                       fullWidth
                                />
                                <FormSelect
                                    label='Размер часов'
                                    name='clock_type'
                                    options={clockTypeOptions}
                                    fullWidth
                                />
                                <FormSelect
                                    label='Город'
                                    name='city_id'
                                    options={cityOptions}
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