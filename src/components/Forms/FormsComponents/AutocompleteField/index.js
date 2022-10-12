import * as React from "react";
import {useState} from "react";
import {Autocomplete, TextField} from "@mui/material";

const AutocompleteField = ({options, label, optionValueKey, value, handleValueChange, ...props}) => {
    const [objValue, setObjValue] = useState(null);
    return (<>
        <Autocomplete
            value={objValue}
            onChange={(e, v) => setObjValue(v)}
            inputValue={value}
            onInputChange={(e, v) => handleValueChange(v)}
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