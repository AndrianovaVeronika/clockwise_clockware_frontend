import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Paper, Rating, TextField, Typography} from "@mui/material";
import * as Yup from 'yup';
import {addMaster} from "../../../store/actions/masters";
import {getCities} from "../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import FormSelect from "../FormSelect";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";

const initialValues = {
    name: '',
    rating: 0,
}

const MasterForm = ({specifiedInitialValues, submitAction}) => {
    const dispatch = useDispatch();

    const [citiesChosed, setCitiesChosed] = useState([]);

    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setCitiesChosed(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const incomeCities = useSelector(getCitiesSelector);

    const getCityOptions = () => {
        console.log('INCOME CITIES', incomeCities);
        const cities = [];
        for (const city of incomeCities) {
            cities.push({key: city.name, value: city.name});
        }
        console.log('RESULT CITIES', cities);
        return cities;
    }

    const cityOptions = getCityOptions();

    useEffect(() => {
        dispatch(getCities());
    }, [dispatch])

    const paperStyle = {padding: '10px 10px', width: '90%', margin: '10px auto'}

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const onSubmit = (values, props) => {
        console.log({...values, cities: citiesChosed});
        dispatch(submitAction({...values, cities: citiesChosed}));
        props.resetForm();
    }

    return (
        <>
            <Paper elevation={0} style={paperStyle}>
                <Formik initialValues={specifiedInitialValues || initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form className='masterForm' id='master-form'>
                                <Field as={TextField}
                                       label='Name'
                                       name='name'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='name'/>}
                                       required
                                />
                                <div>
                                    <Typography component="legend">Rating</Typography>
                                    <Rating
                                        name="rating"
                                        value={props.values.rating}
                                        onChange={({target}) => props.setFieldValue('rating', parseInt(target.value))}
                                    />
                                </div>
                                <FormSelect
                                    label='Города'
                                    name='cities'
                                    options={cityOptions}
                                    value={citiesChosed}
                                    onChange={handleChange}
                                    multiple
                                    fullWidth
                                />
                            </Form>
                        )
                    }
                </Formik>
            </Paper>
        </>
    );
}

export default MasterForm;