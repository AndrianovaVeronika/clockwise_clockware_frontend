import React from 'react';
import {Typography} from '@mui/material'
import {getCitiesSelector} from "../../../store/selectors/citiesSelector";
import {useSelector} from "react-redux";
import {getMastersSelector} from "../../../store/selectors/mastersSelector";
import {getCurrentUserSelector} from "../../../store/selectors/authSelector";
import {getClockTypesSelector} from "../../../store/selectors/clockTypesSelector";

const ResultsReport = ({formId, onFinalSubmit, values}) => {
    const city = useSelector(getCitiesSelector).filter((el) => el.id === values.cityId);
    const master = useSelector(getMastersSelector).filter((el) => el.id === values.masterId);
    const clockType = useSelector(getClockTypesSelector).filter((el) => el.id === values.clockTypeId);
    const user = useSelector(getCurrentUserSelector);

    const orderData = {
        username: 'Name: ' + user?.username? user.username: '',
        email: 'Mail: ' + user?.email? user.email: '',
        clockType: 'Clock size: ' + clockType[0]? clockType[0].name: '',
        master: 'Master: ' + master[0]? master[0].name: '',
        city: 'City: ' + city[0]? city[0].name: '',
        date: 'Date: ' + values?.date? values.date: '',
        time: 'Time: ' + values?.time? values.time: ''
    }

    const getReport = () => {
        const report = [];
        for (const orderDataKey in orderData) {
            report.push(<Typography key={orderDataKey}>{orderDataKey + ': ' + orderData[orderDataKey]}</Typography>);
        }
        return report;
    }

    return (
        <form id={formId} onSubmit={onFinalSubmit}>
            {
                getReport()
            }
        </form>
    )
}

export default ResultsReport;