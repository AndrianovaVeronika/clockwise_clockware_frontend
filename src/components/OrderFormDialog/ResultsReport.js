import React from 'react';
import {Typography} from '@mui/material'
import {getCitiesSelector} from "../../store/selectors/citiesSelector";
import {useSelector} from "react-redux";
import {getMastersSelector} from "../../store/selectors/mastersSelector";

const ResultsReport = ({values}) => {
    const city = useSelector(getCitiesSelector).filter((el)=>el.id === values.city_id);

    const master = useSelector(getMastersSelector).filter((el)=>el.id === values.master_id);

    return(
        <>
            <Typography>Имя: {values.name}</Typography>
            <Typography>Логин: {values.login}</Typography>
            <Typography>Тип часов: {values.clock_type}</Typography>
            <Typography>Мастер: {master[0].name}</Typography>
            <Typography>Город: {city[0].name}</Typography>
            <Typography>Дата: {values.date}</Typography>
            <Typography>Время: {values.time}</Typography>
        </>
    )
}

export default ResultsReport;