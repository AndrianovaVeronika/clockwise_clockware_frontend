import React from 'react';
import {Typography} from '@mui/material'
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import {useSelector} from "react-redux";
import {getMastersSelector} from "../../../../store/selectors/mastersSelector";
import {getClockTypesSelector} from "../../../../store/selectors/clockTypesSelector";
import {useTranslation} from "react-i18next";

const ResultsReport = ({formId, onFinalSubmit, values}) => {
    const {t} = useTranslation();
    const city = useSelector(getCitiesSelector).filter((el) => el.id === values.cityId);
    const master = useSelector(getMastersSelector).filter((el) => el.id === values.masterId);
    const clockType = useSelector(getClockTypesSelector).filter((el) => el.id === values.clockTypeId);

    const orderData = {
        name: values?.name ? values?.name : '',
        email: values?.email ? values?.email : '',
        clockType: clockType[0] ? clockType[0]?.name : '',
        master: master[0] ? master[0]?.name : '',
        city: city[0] ? city[0]?.name : '',
        date: values?.date ? values?.date : '',
        time: values?.time ? values?.time : ''
    };

    const getReport = () => {
        const report = [];
        for (const orderDataKey in orderData) {
            report.push(<Typography
                key={orderDataKey}>{`${t(`forms.labels.${orderDataKey}`)}: ${orderData[orderDataKey]}`}</Typography>);
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