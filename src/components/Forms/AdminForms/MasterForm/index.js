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

const initialValues = {
    name: '',
    rating: 0,
    cities: []
}

const MasterForm = ({specifiedInitialValues, submitAction, formId, setDataTableAlert, clearDataTableSelectedRow}) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [citiesChosen, setCitiesChosen] = useState(specifiedInitialValues?.cities || []);

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
        dispatch(cities.getAll());
    }, [dispatch])

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
    })

    const [Error, setError] = useState(<></>);

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(submitAction(specifiedInitialValues ? {
            id: specifiedInitialValues.id,
            ...values,
            cities: citiesChosen
        } : {...values, cities: citiesChosen}));
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
                    {
                        (props) => (
                            <Form id={formId}>
                                <FormikTextField
                                    label='Name'
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
                                <FormikSelectField
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
                {Error}
            </Paper>
        </>
    );
}

export default MasterForm;