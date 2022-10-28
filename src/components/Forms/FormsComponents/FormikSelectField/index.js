import React from 'react'
import {ErrorMessage, Field} from 'formik'
import {Box, MenuItem, Select, Typography} from "@mui/material";
import useStyles from "../../../../styles/useStyles";

const FormikSelectField = ({label, name, options, className, ...props}) => {
    const classes = useStyles();

    return <Box className={className}>
        <Typography htmlFor={name + '-field'} className={classes.formItemLabel}>{label}</Typography>
        <Field as={Select}
               selected={0}
               id={name + '-field'}
               name={name}
               fullWidth
               className={classes.formItem}
               {...props}
        >
            {options.map(option => {
                return (
                    <MenuItem key={option.key} value={option.key}>
                        {option.value}
                    </MenuItem>
                )
            })}
        </Field>
        <ErrorMessage name={name}/>
    </Box>
}

export default FormikSelectField;