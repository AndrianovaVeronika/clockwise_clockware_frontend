import {Box, Button} from "@mui/material";
import {Form, Formik} from "formik";
import * as React from "react";
import {useEffect, useState} from "react";
import useStyles from "../../../../styles/useStyles";
import AutocompleteField from "../../FormsComponents/AutocompleteField";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {useTranslation} from "react-i18next";
import RangeInput from "../../FormsComponents/RangeInputField";
import FormikDateRangeField from "../../FormsComponents/FormikDateRangeField";
import {getAllMasters} from "../../../../store/getters/masters";
import {getAllCities} from "../../../../store/getters/cities";
import YesNoChooseField from "../../FormsComponents/YesNoChooseField";
import {getAllClockTypes} from "../../../../store/getters/clockTypes";

const initialValues = {
    clockTypeId: '',
    cityId: undefined,
    masterId: undefined,
    isCompleted: undefined,
    dateRange: [null, null],
    priceRange: [0, 60]
};

const UserOrdersFiltrationForm = ({filtrate}) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [clockTypesOptions, setClockTypesOptions] = useState([]);
    useEffect(async () => {
        const clockTypes = await getAllClockTypes();
        setClockTypesOptions(clockTypes.map(clockType => ({
            key: clockType.id,
            value: t(`clockTypes.${clockType.name}`)
        })));
    }, []);

    const [values, setValues] = useState(initialValues);

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...(formValues.clockTypeId && {clockTypeId: formValues.clockTypeId}),
                ...(values.masterId && {masterId: values.masterId}),
                ...(values.cityId && {cityId: values.cityId}),
                ...(formValues.isCompleted && {isCompleted: formValues.isCompleted}),
            },
            ...(((values.dateRange[0] !== null) || (values.dateRange[1] !== null))
                && {dateRange: values.dateRange}),
            priceRange: values.priceRange
        };
        filtrate(filters);
    }

    return (<Box className={classes.filtrationForm}>
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
        >{(props) => (
            <Form id='order-filter'>
                <FormikSelectField
                    label={t("forms.labels.clockType")}
                    name='clockTypeId'
                    options={clockTypesOptions}
                />
                <AutocompleteField
                    getOptionsFunction={getAllMasters}
                    label={t("forms.labels.master")}
                    optionValueKey={'name'}
                    handleValueChange={(v) => {
                        setValues({...values, masterId: v});
                    }}
                    neededValueKey={'id'}
                    className={classes.filtrationFormItem}
                />
                <AutocompleteField
                    getOptionsFunction={getAllCities}
                    label={t("forms.labels.city")}
                    optionValueKey={'name'}
                    handleValueChange={(v) => {
                        setValues({...values, cityId: v})
                    }}
                    neededValueKey={'id'}
                    className={classes.filtrationFormItem}
                />
                <YesNoChooseField
                    label={t("forms.labels.isCompleted")}
                    name={'isCompleted'}
                    value={values.isCompleted}
                    handleChange={(v) => {
                        setValues({...values, isCompleted: v})
                    }}
                />
                <RangeInput
                    label={t("forms.labels.price")}
                    from={0}
                    to={60}
                    step={0.1}
                    value={values.priceRange}
                    handleValueChange={(v) => {
                        setValues({...values, priceRange: v})
                    }}
                    className={classes.filtrationFormItem}
                />
                <FormikDateRangeField
                    value={values.dateRange}
                    handleChange={(v) => {
                        setValues({...values, dateRange: v});
                    }}
                />
            </Form>
        )}</Formik>
        <Button type='submit' form='order-filter'>Confirm</Button>
    </Box>)
};

export default UserOrdersFiltrationForm;