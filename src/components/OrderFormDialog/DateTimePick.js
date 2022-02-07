import React, {useEffect, useState} from "react";
import {Box, List, ListItem, ListItemButton, ListItemText, TextField} from "@mui/material";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {getOccupiedHoursSelector} from "../../store/selectors/ordersSelector";
import {useSelector} from "react-redux";
import moment from "moment";
import clockType from "../../static/clockType";
import store from "../../store/store";
import {getOccupiedHours} from "../../store/actions/orders";

const initialValues = {
    date: moment(),
    time: ''
}

const DateTimePick = ({shiftTimeStart, shiftTimeEnd, master_id, onChangeDatetime}) => {
    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        store.dispatch(getOccupiedHours({master_id: master_id, date: moment(values.date).format('DD-MM-YYYY')}));
    }, [master_id, values]);

    const occupiedHours = useSelector(getOccupiedHoursSelector);

    //different types of clocks are being repaired different amount of time
    const getRepairingHoursByType = (type) => {
        switch (type) {
            case clockType.small: {
                return 1;
            }
            case clockType.average: {
                return 2;
            }
            case clockType.big: {
                return 3;
            }
            default: {
                return;
            }
        }
    }

    // returns all hours occupied by orders (with +1 hour after work's finish for moving to next object)
    const getAllOccupiedHours = () => {
        const hours = [];
        for (const el of occupiedHours) {
            const repairingHours = getRepairingHoursByType(el.clock_type);
            for (let i = 0; i < repairingHours + 1; i++) {
                const newTime = (parseInt(el.time.slice(0, 2)) + i) + ':00:00';
                hours.push(newTime);
            }
        }
        return hours;
    }

    // returns all hours available within a day
    const getAllPossibbleHours = () => {
        const hours = [];
        for (let i = shiftTimeStart; i <= shiftTimeEnd; i++) {
            hours.push(i + ':00:00');
        }
        return hours;
    }

    //returns hours available to book
    const getAvailableHours = () => {
        const hourElements = [];
        const availableHours = [];
        const occupiedHours = getAllOccupiedHours();
        const possibleHours = getAllPossibbleHours();

        if (!(occupiedHours.length < 1)) {
            //push all unoccupied hours
            for (let i = 0; i < possibleHours.length; i++) {
                if (occupiedHours.includes(possibleHours[i])) {
                    continue;
                }
                availableHours.push(possibleHours[i]);
            }
        } else {
            possibleHours.map(el => availableHours.push(el));
        }

        for (let i = 0; i < availableHours.length; i++) {
            hourElements.push(
                <ListItem key={i} component="div" disablePadding>
                    <ListItemButton
                        onClick={(e) => onChangeDatetime({
                            date: moment(values.date).format('DD-MM-YYYY'),
                            time: e.target.innerText
                        })}
                    >
                        <ListItemText>
                            {availableHours[i]}
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            );
        }

        return hourElements;
    }

    const hours = getAvailableHours();

    return (
        <Box sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                    name="date"
                    label="Дата"
                    minDate={new Date()}
                    value={values.date}
                    onChange={(value) => setValues({...values, date: value})}
                    renderInput={(params) => <TextField {...params}/>}/>
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

export default DateTimePick;