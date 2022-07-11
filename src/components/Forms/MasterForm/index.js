import React, {useEffect, useState} from "react";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {Paper, Rating, TextField, Typography} from "@mui/material";
import * as Yup from 'yup';
import {getCities} from "../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import FormSelect from "../FormSelect";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import useStyles from "../../../styles/useStyles";

const initialValues = {
    name: '',
    rating: 0,
    cities: []
}

const MasterForm = ({specifiedInitialValues, submitAction, formId}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    console.log(specifiedInitialValues)

    const [citiesChosen, setCitiesChosen] = useState(specifiedInitialValues?.cities?.split(', ') || []);

    const handleChange = (event) => {
        const {target: {value}} = event;
        setCitiesChosen(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const incomeCities = useSelector(getCitiesSelector);

    const getCityOptions = () => {
        const cities = [];
        for (const city of incomeCities) {
            cities.push({key: city.name, value: city.name});
        }
        return cities;
    }

    const cityOptions = getCityOptions();

    useEffect(() => {
        dispatch(getCities());
    }, [dispatch])

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const onSubmit = (values, props) => {
        dispatch(submitAction(specifiedInitialValues ? {
            id: specifiedInitialValues.id,
            ...values,
            cities: citiesChosen
        } : {...values, cities: citiesChosen}));
        props.resetForm();
    }

    return (
        <>
            <Paper elevation={0} className={classes.formPaper}>
                <Formik initialValues={specifiedInitialValues || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {
                        (props) => (
                            <Form id={formId}>
                                <Field as={TextField}
                                       label='Name'
                                       name='name'
                                       fullWidth
                                       error={props.errors.name && props.touched.name}
                                       helperText={<ErrorMessage name='name'/>}
                                       required
                                       className={classes.formItem}
                                       onClick={() => console.log(props.values)}
                                />
                                <div
                                    className={classes.formItem}
                                >
                                    <Typography component="legend">Rating</Typography>
                                    <Rating
                                        name="rating"
                                        value={props.values.rating}
                                        onChange={({target}) => props.setFieldValue('rating', parseInt(target.value))}
                                    />
                                </div>
                                <FormSelect
                                    label='Cities'
                                    name='cities'
                                    options={cityOptions}
                                    value={citiesChosen}
                                    onChange={handleChange}
                                    multiple
                                    fullWidth
                                    className={classes.formItem}
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