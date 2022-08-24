import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import {Form, Formik, useFormikContext} from "formik";
import {getClockTypesSelector} from "../../../../store/selectors/clockTypesSelector";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import useStyles from "../../../../styles/useStyles";
import * as Yup from "yup";
import {Alert, AlertTitle, Box, Grid} from "@mui/material";
import {shiftTimeEnd, shiftTimeStart} from "../../../../static/constants";
import moment from "moment";
import AvailableMastersListener from "./AvailableMastersListener";
import masters from "../../../../store/actions/masters";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikDataTableField from "../../FormsComponents/FormikDataTableField";

const getTomorrow = () => {
    const today = new Date();
    return today.setDate(today.getDate() + 1);
}
const tomorrow = getTomorrow();

const dateToString = date => moment(date).format('YYYY-MM-DD');
const getValuesWithValidatedDate = values => ({...values, date: dateToString(values.date)});

const initialValues = {
    name: '',
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

const AdminOrderForm = ({
                            submitAction,
                            specifiedInitialValues,
                            formId,
                            setDataTableAlert,
                            clearDataTableSelectedRow
                        }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [Error, setError] = useState(<></>);

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
        name: Yup.string().min(3, 'Name is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required')
    });

    const MastersController = () => {
        const {values} = useFormikContext();
        useEffect(() => {
            if (values.clockTypeId && values.cityId && values.date && values.time) {
                dispatch(masters.getAvailableMasters(getValuesWithValidatedDate(values)));
            }
        }, [values.clockTypeId, values.cityId, values.date, values.time]);
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
            <Formik
                initialValues={specifiedInitialValues || initialValues}
                onSubmit={validatedOnSubmit}
                validationSchema={validationSchema}
            >{(props) => (
                <Form id={formId} className={classes.adminOrderForm}>
                    <MastersController/>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <FormikTextField
                                label='Name'
                                name='name'
                                error={props.errors.name && props.touched.name}
                                required
                            />
                            <FormikTextField
                                label='Email'
                                name='email'
                                error={props.errors.email && props.touched.email}
                                required
                            />
                            <FormikSelectField
                                label='Clock size'
                                name='clockTypeId'
                                error={props.errors.clockTypeId && props.touched.clockTypeId}
                                required
                                options={clockTypeOptions}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <FormikSelectField
                                label='City'
                                name='cityId'
                                error={props.errors.cityId && props.touched.cityId}
                                required
                                options={cityOptions}
                            />
                            <FormikDataTableField
                                label='Date'
                                name='date'
                                minDate={specifiedInitialValues ? undefined : tomorrow}
                                value={props.values.date}
                                onChange={(value) => {
                                    props.setValues(values => ({...values, date: value}));
                                }}
                                error={props.errors.date && props.touched.date}
                            />
                            <FormikSelectField
                                label='Time'
                                name='time'
                                error={props.errors.time && props.touched.time}
                                options={hours.map(hour => {
                                    return {'key': hour, 'value': hour};
                                })}
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <AvailableMastersListener/>
                        </Grid>
                    </Grid>
                </Form>)}
            </Formik>
            {Error}
        </>
    )
}

export default AdminOrderForm;