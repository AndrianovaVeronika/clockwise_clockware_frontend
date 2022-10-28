import {Box, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
import {Field} from "formik";
import * as React from "react";
import useStyles from "../../../../styles/useStyles";


const YesNoChooseField = ({label, value = '', handleChange, ...props}) => {
    const classes = useStyles();

    const onChange = (event) => {
        handleChange(event.target.value);
    };

    return (<Box className={props.className}>
        <Typography className={classes.formItemLabel}>{label}</Typography>
        <Field as={RadioGroup}
               aria-labelledby={label}
               value={value}
               onChange={onChange}
               className={classes.yesNoChooseField}
        >
            <FormControlLabel value={true} control={<Radio/>} label="Yes"/>
            <FormControlLabel value={false} control={<Radio/>} label="No "/>
        </Field>
    </Box>)
};

export default YesNoChooseField;