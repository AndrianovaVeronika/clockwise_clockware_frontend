import React, {useState} from "react";
import {TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from "moment";
import FormSelect from "../FormSelect";
import {Form, Formik} from "formik";

const DateTimePick = ({formId, submitAction, hours, minDate, values}) => {
    const [date, setDate] = useState(values.date);

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
                                <DesktopDatePicker
                                    name="date"
                                    label="Date"
                                    minDate={minDate}
                                    value={date}
                                    onChange={(value) => setDate(value)}
                                    renderInput={(params) => <TextField style={{margin: '10px'}}
                                                                        fullWidth {...params}/>}
                                />
                            </LocalizationProvider>
                            <FormSelect
                                label='Time'
                                name='time'
                                options={hours.map(hour => {
                                    return {'key': hour, 'value': hour};
                                })}
                                fullWidth
                                required
                                style={{margin: '10px'}}
                            />
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}

export default DateTimePick;