import React, {useState} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {clockType, citiesAvailable} from "../../static/mock/orders_mock";
import './style.css';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    TextField,
    MenuItem,
    Select, FormControl
} from "@mui/material";

const initialValues = {
    name: '',
    login: '',
    clocktype: '',
    city: '',
    datetime: new Date(),
    masterid: 0,
}
const axios = require('axios');

const OrderForm = (props) => {
    const textStyle = props.className;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [values, setValues] = useState(initialValues);

    const handleValuesChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleDateTimeChange = (newDateTime) => { //when its date string is passed to newDateTime unlike other
        setValues({...values, datetime: new Date(newDateTime)});
    }

    const onSubmit = () => {
        console.log(values);
        axios({
            method: 'post',
            url: 'http://localhost:3000/orders',
            data: values
        });
    }

    return (
        <>
            <div className={textStyle} id='openForm' onClick={handleClickOpen}>Сделать заказ</div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Введите свои данные чтобы заказать мастера</DialogTitle>
                <form onSubmit={onSubmit}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={6} className='fieldsContainer'>
                                <div className='field'>
                                    <TextField
                                        className='field'
                                        name='name'
                                        variant='outlined'
                                        label='Имя'
                                        value={values.name}
                                        onChange={handleValuesChange}
                                    />
                                </div>
                                <div className='field'>
                                    <TextField
                                        className='field'
                                        name='login'
                                        variant='outlined'
                                        label='Логин'
                                        value={values.login}
                                        onChange={handleValuesChange}
                                    />
                                </div>
                                <FormControl style={{minWidth: 200}}>
                                    <Select
                                        className='field'
                                        id='field-select'
                                        name='clocktype'
                                        value={values.clocktype}
                                        label="Размер часов"
                                        onChange={handleValuesChange}
                                    >
                                        <MenuItem value={clockType.small}>Маленькие</MenuItem>
                                        <MenuItem value={clockType.average}>Средние</MenuItem>
                                        <MenuItem value={clockType.big}>Большие</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6} className='fieldsContainer'>
                                <div className='field'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DateTimePicker
                                            name='datetime'
                                            label="Дата и время приезда мастера"
                                            value={values.datetime}
                                            onChange={handleDateTimeChange}
                                            renderInput={(params) => <TextField {...params} />}
                                        />
                                    </LocalizationProvider>
                                </div>
                                <FormControl style={{minWidth: 200}}>
                                    <Select
                                        className='field'
                                        id='field-select'
                                        name='city'
                                        value={values.city}
                                        label="Город"
                                        onChange={handleValuesChange}
                                    >
                                        <MenuItem value={citiesAvailable[0]}>Днипро</MenuItem>
                                        <MenuItem value={citiesAvailable[1]}>Ужгород</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>
                </form>
                <DialogActions>
                    <Button onClick={handleClose}>Отмена</Button>
                    <Button type='submit' onClick={() => {onSubmit(); handleClose();}}>Заказать</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderForm;