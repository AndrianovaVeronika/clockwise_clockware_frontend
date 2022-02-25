import React from 'react';
import {Typography} from '@mui/material'
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";

const ResultsReport = ({values}) => {
    const city = useSelector(getCitiesSelector).filter((el) => el.id === values.cityId);
    const master = useSelector(getMastersSelector).filter((el) => el.id === values.masterId);
    const clockType = useSelector(getClockTypesSelector).filter((el) => el.id === values.clockTypeId);
    const user = useSelector(getCurrentUserSelector);

    return (
        <>
            <Typography>Имя: {user.username? user.username: ''}</Typography>
            <Typography>Почта: {user.email? user.email: ''}</Typography>
            <Typography>Тип часов: {clockType[0]? clockType[0].name: ''}</Typography>
            <Typography>Мастер: {master[0]? master[0].name: ''}</Typography>
            <Typography>Город: {city[0]? city[0].name: ''}</Typography>
            <Typography>Дата: {values.date? values.date: ''}</Typography>
            <Typography>Время: {values.time? values.time: ''}</Typography>
        </>
    )
}

export default ResultsReport;