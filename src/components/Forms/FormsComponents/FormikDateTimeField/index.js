import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {ErrorMessage, Field} from "formik";
import {LocalizationProvider, MobileDatePicker} from "@mui/lab";
import {InputLabel, TextField} from "@mui/material";
import React from "react";
import useStyles from "../../../../styles/useStyles";

const FormikDateTimeField = ({label, name, minDate, value, onChange}) => {
    const classes = useStyles();

    return <>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <InputLabel className={classes.formItemLabel} htmlFor={name + '-field'}>{label}</InputLabel>
            <Field as={MobileDatePicker}
                   id={name + '-field'}
                   name={name}
                   minDate={minDate}
                   value={value}
                   onChange={onChange}
                   renderInput={(params) =>
                       <TextField
                           className={classes.formItem}
                           fullWidth
                           helperText={<ErrorMessage name={name}/>}
                           {...params}
                       />}
            />
        </LocalizationProvider>
    </>
}

export default FormikDateTimeField;