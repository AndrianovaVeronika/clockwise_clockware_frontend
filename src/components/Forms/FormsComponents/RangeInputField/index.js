import {Box, Slider, Typography} from "@mui/material";
import * as React from "react";

const RangeInput = ({from, to, step, value, handleValueChange, label, className, ...props}) => {
    const numberMarks = [
        {
            value: from,
            label: from.toString()
        },
        {
            value: to,
            label: to.toString()
        }
    ];
    return (<Box className={className}>
        <Typography
            id="range-slider"
            gutterBottom
        >{label}</Typography>
        <Slider
            aria-labelledby="range-slider"
            onChange={(e, v) => handleValueChange(v)}
            defaultValue={[from, to]}
            marks={numberMarks}
            min={from}
            max={to}
            step={step}
            value={value}
            valueLabelDisplay="auto"
            {...props}
        />
    </Box>)
};

export default RangeInput;