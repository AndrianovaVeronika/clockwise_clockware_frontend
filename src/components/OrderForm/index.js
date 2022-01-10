import React, {useEffect, useState} from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import {clockType, citiesAvailable} from "../../static/mock/orders_mock";
import './style.css';
import api from "../../store/middleware/api";
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
import store from "../../store/store";

const axios = require('axios');

const initialValues = {
    name: '',
    login: '',
    clock_type: '',
    city: '',
    datetime: new Date(),
    master_id: 0
}

const OrderForm = (props) => {
    const textStyle = props.className;
    const [values, setValues] = useState(initialValues);
    const [open, setOpen] = useState(false);

    const toggleForm = () => {
        setOpen(!open);
    }

    const handleValuesChange = ({target}) => {
        setValues({...values, [target.name]: target.value});
    }

    //when its date, string is passed to newDateTime unlike other
    const handleDateTimeChange = (newDateTime) => {
        const target = {name: 'datetime', value: new Date(newDateTime)};
        setValues({...values, [target.name]: target.value});
    }

    const onSubmit = () => {
        console.log(values);
        toggleForm();
    }

    return (
        <>
            <div className={textStyle} id='openForm' onClick={toggleForm}>Сделать заказ</div>
            <Dialog open={open} onClose={toggleForm}>
                <DialogTitle>Введите свои данные чтобы заказать мастера</DialogTitle>
                {/*<form onSubmit={onSubmit}>*/}
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
                                    name='clock_type'
                                    value={values.clock_type}
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
                {/*</form>*/}
                <DialogActions>
                    <Button onClick={toggleForm}>Отмена</Button>
                    <Button onClick={onSubmit}>Заказать</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default OrderForm;