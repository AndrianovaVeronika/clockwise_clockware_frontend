import {Box, Button} from "@mui/material";
import {Form, Formik} from "formik";
import * as React from "react";
import {useEffect, useState} from "react";
import {toNumber} from "lodash";
import useStyles from "../../../../styles/useStyles";
import AutocompleteField from "../../FormsComponents/AutocompleteField";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {useTranslation} from "react-i18next";
import RangeInput from "../../FormsComponents/RangeInputField";
import YesNoChooseField from "../../FormsComponents/YesNoChooseField";
import FormikDateRangeField from "../../FormsComponents/FormikDateRangeField";
import {getAllClockTypes} from "../../../../store/getters/clockTypes";
import {getAllUsers} from "../../../../store/getters/users";
import {getAllMasters} from "../../../../store/getters/masters";
import {getAllCities} from "../../../../store/getters/cities";

const initialValues = {
    id: '',
    userId: null,
    clockTypeId: '',
    masterId: null,
    cityId: null,
    isCompleted: undefined,
    dateRange: [null, null],
    priceRange: [0, 60]
};

const OrdersFiltrationForm = ({setFilters}) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [clockTypesOptions, setClockTypesOptions] = useState([]);
    useEffect(async () => {
        const clockTypes = await getAllClockTypes();
        setClockTypesOptions(clockTypes.map(clockType => ({
            key: clockType.id,
            value: t("clockTypes." + clockType.name)
        })));
    }, []);

    const [values, setValues] = useState(initialValues);

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...((formValues.id.length > 0) && {id: toNumber(formValues.id)}),
                ...(values.userId && {userId: values.userId.id}),
                ...(formValues.clockTypeId && {clockTypeId: formValues.clockTypeId}),
                ...(values.masterId && {masterId: values.masterId.id}),
                ...(values.cityId && {cityId: values.cityId.id}),
                ...(values.isCompleted && {isCompleted: (values.isCompleted === 'true')}),
            },
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
                <Box className={classes.filterFormSection}>
                    <FormikTextField
                        name='id'
                        label='ID'
                        className={classes.filtrationFormItem}
                    />
                    <AutocompleteField
                        value={values.userId}
                        getOptionsFunction={getAllUsers}
                        label={t("forms.labels.email")}
                        optionValueKey={'email'}
                        handleValueChange={(v) => {
                            setValues({...values, userId: v})
                        }}
                        neededValueKey={'id'}
                        className={classes.filtrationFormItem}
                    />
                </Box>
                <Box className={classes.filterFormSection}>
                    <FormikSelectField
                        label={t("forms.labels.clockType")}
                        name='clockTypeId'
                        options={clockTypesOptions}
                    />
                    <AutocompleteField
                        value={values.masterId}
                        getOptionsFunction={getAllMasters}
                        label={t("forms.labels.master")}
                        optionValueKey={'name'}
                        handleValueChange={(v) => {
                            setValues({...values, masterId: v});
                        }}
                        neededValueKey={'id'}
                        className={classes.filtrationFormItem}
                    />
                </Box>
                <Box className={classes.filterFormSection}>
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
                    <YesNoChooseField
                        label={t("forms.labels.isCompleted")}
                        name={'isCompleted'}
                        value={values.isCompleted}
                        handleChange={(v) => {
                            setValues({...values, isCompleted: v})
                        }}
                    />
                </Box>
                <Box className={classes.filterFormSection}>
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
                </Box>
            </Form>
            <Button type='submit' form='order-filter'>{t("forms.buttons.confirm")}</Button>
            <Button onClick={() => {
                onClear();
                props.handleReset();
            }}>{t("forms.buttons.clear")}</Button>
        </>)}</Formik>
    </Box>)
};

export default OrdersFiltrationForm;