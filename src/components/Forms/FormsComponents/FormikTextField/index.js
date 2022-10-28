import {Box, InputLabel, TextField, Typography} from "@mui/material";
import {ErrorMessage, Field} from "formik";
import React from "react";
import useStyles from "../../../../styles/useStyles";

const FormikTextField = ({label, name, error, className, ...props}) => {
    const classes = useStyles();
    return <Box className={className}>
        <Typography className={classes.formItemLabel} htmlFor={name + '-field'}>{label}</Typography>
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