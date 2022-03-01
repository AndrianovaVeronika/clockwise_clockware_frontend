import React from 'react';
import {Typography} from '@mui/material'
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {useDispatch, useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";
import {sendMail} from "../../../store/actions";

const ResultsReport = ({formId, onFinalSubmit, values}) => {
    const dispatch = useDispatch();

    const city = useSelector(getCitiesSelector).filter((el) => el.id === values.cityId);
    const master = useSelector(getMastersSelector).filter((el) => el.id === values.masterId);
    const clockType = useSelector(getClockTypesSelector).filter((el) => el.id === values.clockTypeId);
    const user = useSelector(getCurrentUserSelector);

    const orderData = {
        username: 'Имя: ' + user.username? user.username: '',
        email: 'Почта: ' + user.email? user.email: '',
        clockType: 'Тип часов: ' + clockType[0]? clockType[0].name: '',
        master: 'Мастер: ' + master[0]? master[0].name: '',
        city: 'Город: ' + city[0]? city[0].name: '',
        date: 'Дата: ' + values.date? values.date: '',
        time: 'Время: ' + values.time? values.time: ''
    }

    const getReport = () => {
        const report = [];
        for (const orderDataKey in orderData) {
            report.push(<Typography key={orderDataKey}>{orderDataKey + ': ' + orderData[orderDataKey]}</Typography>);
        }
        return report;
    }

    const onSubmit = () => {
        let order = '';
        for (const orderDataKey in orderData) {
            order += '\n' + orderDataKey + ': ' + orderData[orderDataKey];
        }
        dispatch(sendMail({
            to: user.email,
            subject: 'Order `ve been registered successfully',
            text: 'Your order: ' + order,
        }));
        onFinalSubmit();
    }

    return (
        <form id={formId} onSubmit={onSubmit}>
            {
                getReport()
            }
        </form>
    )
}

export default ResultsReport;