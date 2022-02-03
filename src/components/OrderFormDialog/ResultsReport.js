import React from 'react';
import {Typography} from '@mui/material'

const ResultsReport = ({values}) => {
    // const city = initial

    return(
        <>
            <Typography>Имя: {values.name}</Typography>
            <Typography>Логин: {values.login}</Typography>
            <Typography>Тип часов: {values.clock_type}</Typography>
            <Typography>Мастер: {values.master_id}</Typography>
            <Typography>Город: {values.city_id}</Typography>
            <Typography>Дата: {values.date}</Typography>
            <Typography>Время: {values.time}</Typography>
        </>
    )
}