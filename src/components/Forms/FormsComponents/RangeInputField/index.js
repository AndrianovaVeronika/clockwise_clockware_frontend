import {Box, Grid, Input, Slider, Typography} from "@mui/material";
import * as React from "react";
import {toNumber} from "lodash/lang";

const RangeInput = ({from, to, step, value, handleValueChange, label, className, ...props}) => {
    const handleBlur = () => {
        if (value < from) {
            handleValueChange({...value, from: from});
        } else if (value > to) {
            handleValueChange({...value, to: to});
        }
    };

    return (<Box className={className}>
        <Typography
            id="range-slider"
            gutterBottom
        >{label}</Typography>
        <Grid container spacing={2} alignItems="center">
            <Grid item>
                <Input
                    sx={{width: '45px'}}
                    value={value[0]}
                    size="small"
                    onChange={({target}) => {
                        handleValueChange([target.value === '' ? 0 : toNumber(target.value), value[1]]);

                    }}
                    onBlur={handleBlur}
                    inputProps={{
                        step: step,
                        min: from,
                        max: to,
                        type: 'number',
                        'aria-labelledby': 'range-slider',
                    }}
                />
            </Grid>
            <Grid item xs>
                <Slider
                    aria-labelledby="range-slider"
                    onChange={(e, v) => handleValueChange(v)}
                    defaultValue={[from, to]}
                    min={from}
                    max={to}
                    step={step}
                    value={value}
                    {...props}
                />
            </Grid>
            <Grid item>
                <Input
                    sx={{width: '45px'}}
                    value={value[1] === 0 ? '' : value[1]}
                    size="small"
                    onChange={({target}) => {
                        handleValueChange([value[0], target.value === '' ? 0 : toNumber(target.value)]);
                    }}
                    onBlur={handleBlur}
                    inputProps={{
                        step: step,
                        min: from,
                        max: to,
                        type: 'number',
                        'aria-labelledby': 'range-slider',
                    }}
                />
            </Grid>
        </Grid>
    </Box>)
};

export default RangeInput;