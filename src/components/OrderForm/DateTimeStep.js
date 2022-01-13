import React from "react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import {
    Box,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    List,
    ListItem, ListItemButton, ListItemIcon, ListItemText,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {StaticDatePicker} from "@mui/lab";

const DateTimeStep = ({date, handleDateChange, time, handleTimeChange, hours}) => {

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                    name='date'
                    orientation="landscape"
                    openTo="day"
                    value={date.value}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
                <nav aria-label="main mailbox folders">
                    <List>
                        {hours}
                    </List>
                </nav>
            </Box>
        </Box>
    )
}

export default DateTimeStep;