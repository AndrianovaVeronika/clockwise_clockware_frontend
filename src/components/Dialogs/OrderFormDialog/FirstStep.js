import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";
import FormSelect from "../../Forms/FormSelect";
import useStyles from "../../../styles/useStyles";
import * as Yup from "yup";
import {TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {shiftTimeEnd, shiftTimeStart} from "../../../static/constants";
import {getAvailableMasters} from "../../../store/actions/masters";

const getTomorrow = () => {
    const today = new Date();
    return today.setDate(today.getDate() + 1);
}
const tomorrow = getTomorrow();

const initialValues = {
    username: '',
    email: '',
    clockTypeId: '',
    masterId: '',
    cityId: '',
    date: tomorrow,
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

const FirstStep = ({onSubmit, specifiedInitialValues}) => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [values, setValues] = useState(specifiedInitialValues || initialValues);

    const cities = useSelector(getCitiesSelector);
    const clockTypes = useSelector(getClockTypesSelector);
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



    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required')
    });

    return (
        <Formik
            initialValues={specifiedInitialValues && initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
        >{(props) => (
            <Form id={'order-form'}>
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
                    // onChange={(value) => {
                    //     setValues({clockTypeId: value, ...values});
                    //     dispatch(getAvailableMasters(values));
                    // }}
                />
                <FormSelect
                    label='City'
                    name='cityId'
                    options={cityOptions}
                    required
                    fullWidth
                    className={classes.formItem}
                    // onChange={(value) => {
                    //     setValues({cityId: value, ...values});
                    //     dispatch(getAvailableMasters(values));
                    // }}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Field as={DesktopDatePicker}
                           name="date"
                           label="Date"
                           minDate={tomorrow}
                           value={values.date}
                           error={props.errors.date && props.touched.date}
                           renderInput={(params) =>
                               <TextField
                                   className={classes.formItem}
                                   fullWidth
                                   {...params}
                               />}
                           onChange={(value) => {
                               setValues({date: value, ...values});
                               // dispatch(getAvailableMasters(values));
                           }}
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
                    // onChange={(value) => {
                    //     setValues({time: value, ...values});
                    //     dispatch(getAvailableMasters(values));
                    // }}
                />
                <FormSelect
                    label='Master'
                    name='master'
                    className={classes.formItem}
                    fullWidth
                    required
                    options={[]}
                    onClick={()=>dispatch(getAvailableMasters(values))}
                />
            </Form>)}
        </Formik>
    )
}

export default FirstStep;