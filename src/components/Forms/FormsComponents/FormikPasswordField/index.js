import React, {useState} from "react";
import {FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography} from "@mui/material";
import {ErrorMessage, Field} from "formik";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import useStyles from "../../../../styles/useStyles";

const FormikPasswordField = ({name, label, error, ...props}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return <>
        <Typography className={classes.formItemLabel} htmlFor={name + '-field'}>{label}</Typography>
        <Field as={OutlinedInput}
               id={name + '-field'}
               name={name}
               type={showPassword ? 'text' : 'password'}
               fullWidth
               className={classes.formItem}
               error={error}
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
        <FormHelperText className={classes.helperText} error={error}><ErrorMessage name={name}/></FormHelperText>
    </>
}

export default FormikPasswordField;