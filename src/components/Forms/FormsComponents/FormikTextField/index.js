import {InputLabel, TextField} from "@mui/material";
import {ErrorMessage, Field} from "formik";
import React from "react";
import useStyles from "../../../../styles/useStyles";

const FormikTextField = ({label, name, error, ...props}) => {
    const classes = useStyles();
    return <>
        <InputLabel className={classes.formItemLabel} htmlFor={name + '-field'}>{label}</InputLabel>
        <Field as={TextField}
               id={name + '-field'}
               name={name}
               className={classes.formItem}
               fullWidth
               error={error}
               helperText={<ErrorMessage name={name}/>}
               {...props}
        />
    </>
}

export default FormikTextField;