import React, {useState} from "react";
import {TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from "moment";
import FormSelect from "../FormSelect";
import {Field, Form, Formik} from "formik";
import useStyles from "../../../styles/useStyles";

const getTomorrow = () => {
    const today = new Date();
    return today.setDate(today.getDate() + 1);
}
const tomorrow = getTomorrow();

const DateTimePick = ({formId, submitAction, hours, values}) => {
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
        <div style={{margin: '20px'}}>
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
        </div>
    )
}

export default DateTimePick;