import React from 'react'
import {ErrorMessage, Field} from 'formik'
import {Box, InputLabel, MenuItem, Select} from "@mui/material";
import useStyles from "../../../../styles/useStyles";

const FormikSelectField = ({label, name, options, className, ...props}) => {
    const classes = useStyles();

    return <Box className={className}>
        <InputLabel htmlFor={name + '-field'}>{label}</InputLabel>
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