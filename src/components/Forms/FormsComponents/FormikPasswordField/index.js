import React, {useState} from "react";
import {IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {ErrorMessage, Field} from "formik";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import useStyles from "../../../../styles/useStyles";

const FormikPasswordField = ({name, label, ...props}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return <>
        <InputLabel className={classes.formItemLabel} htmlFor={name + '-field'}>{label}</InputLabel>
        <Field as={OutlinedInput}
               id={name + '-field'}
               name={name}
               type={showPassword ? 'text' : 'password'}
               helpertext={<ErrorMessage name='password'/>}
               fullWidth
               className={classes.formItem}
               endAdornment={
                   <InputAdornment position="end">
                       <IconButton
                           onClick={handleClickShowPassword}
                           onMouseDown={handleMouseDownPassword}
                           edge="end"
                       >
                           {showPassword ? <VisibilityOff/> : <Visibility/>}
                       </IconButton>
                   </InputAdornment>
               }
               {...props}
        />
    </>
}

export default FormikPasswordField;