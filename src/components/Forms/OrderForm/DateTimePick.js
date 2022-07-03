import React, {useState} from "react";
import {TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from "moment";
import FormSelect from "../FormSelect";
import {Field, Form, Formik} from "formik";
import useStyles from "../../../styles/useStyles";
import {shiftTimeEnd, shiftTimeStart} from "../../../static/constants";

const getTomorrow = () => {
    const today = new Date();
    return today.setDate(today.getDate() + 1);
}
const tomorrow = getTomorrow();

// returns all hours available within a day
const getHours = () => {
    const hours = [];
    for (let i = shiftTimeStart; i <= shiftTimeEnd; i++) {
        hours.push(i + ':00:00');
    }
    return hours;
}
const hours = getHours();

const DateTimePick = ({formId, submitAction, values}) => {
    const [date, setDate] = useState(values.date || tomorrow);
    const classes = useStyles();

    const isDateValid = () => {
        const minDate = new Date();
        const incomeDate = new Date(date);
        return incomeDate > minDate;
    }

    const onSubmit = (v, props) => {
        if (isDateValid()) {
            const dateFormated = moment(date).format('YYYY-MM-DD');
            submitAction({time: v.time, date: dateFormated});
        }
    }

    return (
        <Formik initialValues={values} onSubmit={onSubmit}>
            {
                (props) => (
                    <Form id={formId}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Field as={DesktopDatePicker}
                                   name="date"
                                   label="Date"
                                   minDate={tomorrow}
                                   value={date}
                                   onChange={(value) => setDate(value)}
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
                        />
                    </Form>
                )
            }
        </Formik>
    )
}

export default DateTimePick;