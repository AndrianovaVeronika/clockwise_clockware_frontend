import {Box, InputLabel, TextField} from "@mui/material";
import {ErrorMessage, Field} from "formik";
import React from "react";
import useStyles from "../../../../styles/useStyles";

const FormikTextField = ({label, name, error, className, ...props}) => {
    const classes = useStyles();
    return <Box className={className}>
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
    </Box>
}

export default FormikTextField;