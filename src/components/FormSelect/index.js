import React from 'react'
import {ErrorMessage, Field} from 'formik'
import {MenuItem, Select} from "@mui/material";

const FormSelect = (props) => {
    const {label, name, options, ...rest} = props

    return (
        <div className='form-control'>
            <label htmlFor={name}>{label}</label>
            <Field as={Select} id={name} name={name} {...rest}>
                {options.map(option => {
                    return (
                        <MenuItem key={option.key} value={option.key}>
                            {option.value}
                        </MenuItem>
                    )
                })}
            </Field>
            <ErrorMessage name={name}/>
        </div>
    )
}

export default FormSelect;