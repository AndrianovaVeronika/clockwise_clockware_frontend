import * as React from "react";
import {useEffect, useState} from "react";
import {Autocomplete, Box, TextField, Typography} from "@mui/material";

const AutocompleteField = ({
                               value,
                               getOptionsFunction,
                               label,
                               optionValueKey,
                               handleValueChange,
                               neededValueKey,
                               className,
                               ...props
                           }) => {
    const [options, setOptions] = useState([]);
    useEffect(async () => {
        const rows = await getOptionsFunction();
        setOptions(rows.data);
    }, []);

    const [input, setInput] = useState('');

    // const isNull = value => value === null;

    return (<Box className={className}>
        <Typography>{label}</Typography>
        <Autocomplete
            value={value}
            onChange={(e, v) => {
                handleValueChange(v);
                // handleValueChange(isNull(v) ? '' : v[neededValueKey]);
            }}
            inputValue={input}
            onInputChange={(e, v) => {
                setInput(v);
            }}
            options={options}
            isOptionEqualToValue={(option, v) => option.id === v.id}
            getOptionLabel={(option) => option[optionValueKey]}
            {...props}
            renderInput={(params) =>
                <TextField
                    {...params}
                />}
        />
    </Box>)
};

export default AutocompleteField;