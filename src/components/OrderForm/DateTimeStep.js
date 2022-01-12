import React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {TextField} from "@mui/material";

const DateTimeStep = ({}) => {
return (
    <div className='field'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                name='datetime'
                label="Дата и время приезда мастера"
                value={values.datetime.value}
                minDateTime={new Date()}
                onChange={handleDateTimeChange}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        id="outlined-error-helper-text"
                        error={values.datetime.isError}
                        helperText={values.datetime.helperText}
                    />
                }
            />
        </LocalizationProvider>
    </div>
)
}

export default DateTimeStep;