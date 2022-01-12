import React, {useEffect} from "react";
import {Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import clockType from "../../static/clockType";

const CredentialsStep = ({name, login, clock_type, city, handleCredentialsChange, cities}) => {

    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            <TextField
                // className='field'
                id="outlined-error-helper-text"
                name='name'
                variant='outlined'
                label='Имя'
                value={name.value}
                error={name.isError}
                helperText={name.helperText}
                onChange={handleCredentialsChange}
            />
            <TextField
                // className='field'
                id="outlined-error-helper-text"
                name='login'
                variant='outlined'
                label='Логин'
                value={login.value}
                error={login.isError}
                helperText={login.helperText}
                onChange={handleCredentialsChange}
            />
            <FormControl
                className='field'
                sx={{m: 1, minWidth: 120}}
                error={clock_type.isError}
            >
                <InputLabel id="select-clock_type">Размер часов</InputLabel>
                <Select
                    labelId='select-clock_type'
                    id='demo-simple-select-helper'
                    name='clock_type'
                    label='Размер часов'
                    value={clock_type.value}
                    onChange={handleCredentialsChange}
                >
                    <MenuItem value={clockType.small}>Маленькие</MenuItem>
                    <MenuItem value={clockType.average}>Средние</MenuItem>
                    <MenuItem value={clockType.big}>Большие</MenuItem>
                </Select>
                <FormHelperText>{clock_type.helperText}</FormHelperText>
            </FormControl>
            <FormControl
                className='field'
                sx={{m: 1, minWidth: 120}}
                error={city.isError}
            >
                <InputLabel id="select-city">Город</InputLabel>
                <Select
                    labelId='select-city'
                    id='demo-simple-select-helper'
                    name='city_id'
                    value={cities[city.value]}
                    onChange={handleCredentialsChange}
                >{cities}</Select>
                <FormHelperText>{city.helperText}</FormHelperText>
            </FormControl>
        </Box>
    )
}

export default CredentialsStep;