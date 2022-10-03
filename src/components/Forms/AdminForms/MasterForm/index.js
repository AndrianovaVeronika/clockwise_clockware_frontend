import React, {useEffect, useState} from "react";
import {Form, Formik} from "formik";
import {Alert, AlertTitle, Box, InputLabel, Paper, Rating} from "@mui/material";
import * as Yup from 'yup';
import cities from "../../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import useStyles from "../../../../styles/useStyles";
import FormikTextField from "../../FormsComponents/FormikTextField";
import {useTranslation} from "react-i18next";

const initialValues = {
    name: '',
    email: '',
    rating: 0,
    cities: []
}

const getCityOptionsForSelect = (incomeCities) => {
    const cities = [];
    for (const city of incomeCities) {
        cities.push({key: city.name, value: city.name});
    }
    return cities;
}

const MasterForm = ({specifiedInitialValues, submitAction, formId, setDataTableAlert, clearDataTableSelectedRow}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = useStyles();

    const [values, setValues] = useState(initialValues);

    const setCities = (newCities) => {
        setValues({...values, cities: newCities});
    }

    const handleChange = (event) => {
        const {target: {value}} = event;
        setCities(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        dispatch(cities.getAll());
    }, [dispatch])

    const incomeCities = useSelector(getCitiesSelector);
    const cityOptions = getCityOptionsForSelect(incomeCities);

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, t("forms.validationErrors.shortName")).required(t("forms.validationErrors.required")),
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (formValues, props) => {
        setValues({...formValues, cities: values.cities});
        const {error, payload} = await dispatch(submitAction(specifiedInitialValues ? {
            id: specifiedInitialValues.id,
            ...values
        } : values));
        props.resetForm();
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
            if (clearDataTableSelectedRow) {
                clearDataTableSelectedRow();
            }
            setDataTableAlert(
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    {'Row has been added/updated successfully.'}
                </Alert>
            );
        }
    }

    return (
        <>
            <Paper elevation={0} className={classes.formPaper}>
                <Formik initialValues={specifiedInitialValues || initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                    {(props) => (
                        <Form id={formId} className={classes.twoColumnForm}>
                            <Box className={classes.formSection}>
                                <FormikTextField
                                    label={t("forms.labels.name")}
                                    name='name'
                                    error={props.errors.name && props.touched.name}
                                    required
                                />
                                <Box>
                                    <InputLabel className={classes.formItemLabel}>Rating</InputLabel>
                                    <Rating
                                        className={classes.formItem}
                                        name="rating"
                                        value={props.values.rating}
                                        onChange={({target}) => props.setFieldValue('rating', parseInt(target.value))}
                                    />
                                </Box>
                            </Box>
                            <Box className={classes.formSection}>
                                <FormikTextField
                                    label={t("forms.labels.email")}
                                    name='email'
                                    error={props.errors.email && props.touched.email}
                                    required
                                />
                                <FormikSelectField
                                    label={t("forms.labels.cities")}
                                    name='cities'
                                    options={cityOptions}
                                    value={values.cities}
                                    onChange={handleChange}
                                    multiple
                                    fullWidth
                                    className={classes.formItem}
                                />
                            </Box>
                        </Form>
                    )}
                </Formik>
                {Error}
            </Paper>
        </>
    );
}

export default MasterForm;