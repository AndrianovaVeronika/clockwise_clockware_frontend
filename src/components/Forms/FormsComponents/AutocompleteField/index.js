import * as React from "react";
import {useEffect, useState} from "react";
import {Autocomplete, TextField} from "@mui/material";

const AutocompleteField = ({getOptionsFunction, label, optionValueKey, handleValueChange, neededValueKey, ...props}) => {
    const [options, setOptions] = useState([]);
    useEffect(async () => {
        setOptions(await getOptionsFunction());
    }, []);

    const [objValue, setObjValue] = useState(null);
    const [input, setInput] = useState('');

    const isNull = value => value === null;

    return (<>
        <Autocomplete
            value={objValue}
            onChange={(e, v) => {
                setObjValue(v);
                handleValueChange(isNull(v) ? '' : v[neededValueKey]);
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
                    label={label}
                    {...params}
                />}
        />
    </>)
};

export default AutocompleteField;