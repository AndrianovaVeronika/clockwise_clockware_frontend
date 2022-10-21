import {Box, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";
import {Field} from "formik";
import * as React from "react";


const YesNoChooseField = ({label, value = '', handleChange, ...props}) => {
    const onChange = (event) => {
        handleChange(event.target.value);
    };

    return (<Box className={props.className}>
        <FormLabel id={label}>{label}</FormLabel>
        <Field as={RadioGroup}
               aria-labelledby={label}
               value={value}
               onChange={onChange}
        >
            <FormControlLabel value={true} control={<Radio/>} label="Yes"/>
            <FormControlLabel value={false} control={<Radio/>} label="No "/>
        </Field>
    </Box>)
};

export default YesNoChooseField;