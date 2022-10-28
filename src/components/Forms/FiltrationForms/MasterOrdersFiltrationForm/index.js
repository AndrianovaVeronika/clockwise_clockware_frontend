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
import {getAllClockTypes} from "../../../../store/getters/clockTypes";
import {getAllCities} from "../../../../store/getters/cities";
import YesNoChooseField from "../../FormsComponents/YesNoChooseField";
import FormikTextField from "../../FormsComponents/FormikTextField";

const initialValues = {
    clockTypeId: '',
    cityId: null,
    isCompleted: undefined,
    dateRange: [null, null],
    priceRange: [0, 60],
    login: ''
};

const MasterOrdersFiltrationForm = ({setFilters}) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [values, setValues] = useState(initialValues);

    const [clockTypesOptions, setClockTypesOptions] = useState([]);
    useEffect(async () => {
        const clockTypes = await getAllClockTypes();
        setClockTypesOptions(clockTypes.map(clockType => ({
            key: clockType.id,
            value: t(`clockTypes.${clockType.name}`)
        })));
    }, []);

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...(formValues.clockTypeId && {clockTypeId: formValues.clockTypeId}),
                ...(values.cityId && {cityId: values.cityId.id}),
                ...(values.isCompleted && {isCompleted: values.isCompleted}),
            },
            ...((formValues.login.length > 0) && {login: formValues.login}),
            ...(((values.dateRange[0] !== null) || (values.dateRange[1] !== null))
                && {dateRange: values.dateRange}),
            priceRange: values.priceRange
        };
        setFilters(filters);
    }

    const onClear = () => {
        setValues(initialValues);
        setFilters({});
    }

    return (<Box className={classes.filtrationForm}>
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
        >{(props) => (<>
            <Form id='order-filter' className={classes.filter}>
                <FormikTextField
                    label={`${t("forms.labels.login")}`}
                    name={'login'}
                    className={classes.filtrationFormItem}
                />
                <AutocompleteField
                    value={values.cityId}
                    getOptionsFunction={getAllCities}
                    label={t("forms.labels.city")}
                    optionValueKey={'name'}
                    handleValueChange={(v) => {
                        setValues({...values, cityId: v})
                    }}
                    neededValueKey={'id'}
                    className={classes.filtrationFormItem}
                />
                <FormikSelectField
                    label={t("forms.labels.clockType")}
                    name='clockTypeId'
                    options={clockTypesOptions}
                    className={classes.filtrationFormItem}
                />
                <YesNoChooseField
                    label={t("forms.labels.isCompleted")}
                    name={'isCompleted'}
                    value={values.isCompleted}
                    handleChange={(v) => {
                        setValues({...values, isCompleted: v})
                    }}
                    className={classes.filtrationFormItem}
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
                    className={classes.filtrationFormItem}
                />
            </Form>
            <Button type='submit' form='order-filter'>{t("forms.buttons.confirm")}</Button>
            <Button onClick={() => {
                onClear();
                props.handleReset();
            }}>{t("forms.buttons.clear")}</Button>
        </>)}</Formik>
    </Box>)
};

export default MasterOrdersFiltrationForm;