import React, {useEffect, useState} from 'react';
import {Typography} from '@mui/material'
import {useTranslation} from "react-i18next";
import {getCityById} from "../../../../store/getters/cities";
import {getMasterById} from "../../../../store/getters/masters";
import {getClockTypeById} from "../../../../store/getters/clockTypes";

const ResultsReport = ({formId, onFinalSubmit, values}) => {
    const {t} = useTranslation();

    const [city, setCity] = useState();
    const [master, setMaster] = useState();
    const [clockType, setClockType] = useState();
    useEffect(() => {
        const retrieve = async () => {
            setCity(await getCityById(values.cityId));
            setMaster(await getMasterById(values.masterId));
            setClockType(await getClockTypeById(values.clockTypeId));
        };
        retrieve();
    }, []);

    const orderData = {
        name: values?.name ? values?.name : '',
        email: values?.email ? values?.email : '',
        clockType: clockType ? clockType?.name : '',
        master: master ? master?.name : '',
        city: city ? city?.name : '',
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

    return (<>
        <form id={formId} onSubmit={onFinalSubmit}>
            {getReport()}
        </form>
    </>)
}

export default ResultsReport;