import React, {useState} from "react";
import {TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import moment from "moment";
import FormSelect from "../FormSelect";
import {Form, Formik} from "formik";

const DateTimePick = ({formId, submitAction, hours, initialValues}) => {
    const [date, setDate] = useState(initialValues.date);

    const onSubmit = (v, props) => {
        submitAction({...v, date: moment(date).format('YYYY-MM-DD')});
    }

    return (
        <div style={{margin: '20px'}}>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form id={formId}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    name="date"
                                    label="Дата"
                                    minDate={new Date()}
                                    value={date}
                                    onChange={(value) => setDate(value)}
                                    renderInput={(params) => <TextField style={{margin: '10px'}}
                                                                        fullWidth {...params}/>}
                                />
                            </LocalizationProvider>
                            <FormSelect
                                label='Время'
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