import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {ErrorMessage, Field, Form, Formik, useFormikContext} from "formik";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";
import FormSelect from "../../Forms/FormSelect";
import useStyles from "../../../styles/useStyles";
import * as Yup from "yup";
import {Alert, AlertTitle, Box, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {shiftTimeEnd, shiftTimeStart} from "../../../static/constants";
import {getAvailableMasters} from "../../../store/actions/masters";
import moment from "moment";
import AvailableMastersListener from "./AvailableMastersListener";
import {getClockTypes} from "../../../store/actions/clockTypes";
import {getCities} from "../../../store/actions/cities";

const getTomorrow = () => {
    const today = new Date();
    return today.setDate(today.getDate() + 1);
}
const tomorrow = getTomorrow();

const dateToString = date => moment(date).format('YYYY-MM-DD');
const getValuesWithValidatedDate = values => ({...values, date: dateToString(values.date)});

const initialValues = {
    username: '',
    email: '',
    clockTypeId: '',
    masterId: '',
    cityId: '',
    date: dateToString(tomorrow),
    time: ''
};

// returns all hours available within a day
const getHours = () => {
    const hours = [];
    for (let i = shiftTimeStart; i <= shiftTimeEnd; i++) {
        hours.push(i + ':00:00');
    }
    return hours;
}
const hours = getHours();

const getIdByName = (name, list) => {
    for (const listElement of list) {
        if (listElement.name === name) {
            return listElement.id;
        }
    }
};

const AdminOrderForm = ({submitAction, specifiedInitialValues, formId, setDataTableAlert}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [Error, setError] = useState(<></>);

    useEffect(() => {
        dispatch(getCities());
        dispatch(getClockTypes());
        dispatch(getAvailableMasters());
        setError(<></>);
    }, [dispatch]);

    const cities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);
    const getValidatedCities = () => {
        const elements = [];
        for (const city of cities) {
            elements.push({key: city.id, value: city.name});
        }
        return elements;
    }
    const getValidatedClockTypes = () => {
        const types = [];
        for (const type of clockTypes) {
            types.push({key: type.id, value: type.name});
        }
        return types;
    }
    const cityOptions = getValidatedCities();
    const clockTypeOptions = getValidatedClockTypes();

    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required')
    });

    const MastersController = () => {
        const {values} = useFormikContext();
        useEffect(() => {
            if (values.clockTypeId && values.cityId && values.date && values.time) {
                dispatch(getAvailableMasters(getValuesWithValidatedDate(values)));
            }
        }, [values]);
        return null;
    };

    const validatedOnSubmit = async (values) => {
        const {error, payload} = await dispatch(submitAction({...values, date: dateToString(values.date)}));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
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
            <Formik
                initialValues={specifiedInitialValues ? {
                    ...specifiedInitialValues,
                    cityId: getIdByName(specifiedInitialValues.city, cities),
                    clockTypeId: getIdByName(specifiedInitialValues.clockType, clockTypes)
                } : initialValues}
                onSubmit={validatedOnSubmit}
                validationSchema={validationSchema}
            >{(props) => (
                <Form id={formId} className={classes.adminOrderForm}>
                    <MastersController/>
                    <Box className={classes.adminOrderFormSide}>
                        <Field as={TextField}
                               label='Username'
                               name='username'
                               className={classes.formItem}
                               error={props.errors.username && props.touched.username}
                               helperText={<ErrorMessage name='username'/>}
                               fullWidth
                               required
                        />
                        <Field as={TextField}
                               label='Email'
                               name='email'
                               className={classes.formItem}
                               error={props.errors.email && props.touched.email}
                               helperText={<ErrorMessage name='email'/>}
                               fullWidth
                               required
                        />
                        <FormSelect
                            label='Clock size'
                            name='clockTypeId'
                            options={clockTypeOptions}
                            required
                            fullWidth
                            className={classes.formItem}
                        />
                        <FormSelect
                            label='City'
                            name='cityId'
                            options={cityOptions}
                            required
                            fullWidth
                            className={classes.formItem}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Field as={DesktopDatePicker}
                                   name="date"
                                   label="Date"
                                   minDate={tomorrow}
                                   value={props.values.date}
                                   onChange={(value) => {
                                       props.setValues(values => ({...values, date: value}));
                                   }}
                                   error={props.errors.date && props.touched.date}
                                   renderInput={(params) =>
                                       <TextField
                                           className={classes.formItem}
                                           fullWidth
                                           {...params}
                                       />}
                            />
                        </LocalizationProvider>
                        <FormSelect
                            label='Time'
                            name='time'
                            className={classes.formItem}
                            options={hours.map(hour => {
                                return {'key': hour, 'value': hour};
                            })}
                            fullWidth
                            required
                        /></Box>
                    <Box className={classes.adminOrderFormSide}>
                        <AvailableMastersListener/>
                    </Box>
                </Form>)}
            </Formik>
            {Error}
        </>
    )
}

export default AdminOrderForm;