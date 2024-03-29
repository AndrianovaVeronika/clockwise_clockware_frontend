import React, {useState} from "react";
import moment from "moment";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {Form, Formik} from "formik";
import useStyles from "../../../../styles/useStyles";
import {shiftTimeEnd, shiftTimeStart} from "../../../../static/constants";
import FormikDataTableField from "../../FormsComponents/FormikDateTimeField";
import {useTranslation} from "react-i18next";

const getTomorrow = () => {
    const today = new Date();
    return today.setDate(today.getDate() + 1);
}
const tomorrow = getTomorrow();

// returns all hours available within a day
const getHours = () => {
    const hours = [];
    for (let i = shiftTimeStart; i <= shiftTimeEnd; i++) {
        hours.push(i + ':00:00');
    }
    return hours;
}
const hours = getHours();

const DateTimePick = ({formId, submitAction, values}) => {
    const {t} = useTranslation();
    const [date, setDate] = useState(values.date || tomorrow);
    const classes = useStyles();

    const isDateValid = () => {
        const minDate = new Date();
        const incomeDate = new Date(date);
        return incomeDate > minDate;
    }

    const onSubmit = (v, props) => {
        if (isDateValid()) {
            const dateFormated = moment(date).format('YYYY-MM-DD');
            submitAction({time: v.time, date: dateFormated});
        }
    }

    return (
        <Formik initialValues={values} onSubmit={onSubmit}>
            {
                (props) => (
                    <Form id={formId}>
                        <FormikDataTableField
                            name="date"
                            label={t("forms.labels.date")}
                            minDate={tomorrow}
                            value={date}
                            onChange={(value) => setDate(value)}
                            error={props.errors.date && props.touched.date}
                        />
                        <FormikSelectField
                            label={t("forms.labels.time")}
                            name='time'
                            options={hours.map(hour => {
                                return {'key': hour, 'value': hour};
                            })}
                            required
                        />
                    </Form>
                )
            }
        </Formik>
    )
}

export default DateTimePick;