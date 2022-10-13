import {Box, Button, TextField} from "@mui/material";
import {Form, Formik} from "formik";
import * as React from "react";
import {useState} from "react";
import useStyles from "../../../../styles/useStyles";
import AutocompleteField from "../../FormsComponents/AutocompleteField";
import {useDispatch, useSelector} from "react-redux";
import FormikSelectField from "../../FormsComponents/FormikSelectField";
import {getClockTypesSelector} from "../../../../store/selectors/clockTypesSelector";
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import {getMastersSelector} from "../../../../store/selectors/mastersSelector";
import {useTranslation} from "react-i18next";
import RangeInput from "../../FormsComponents/RangeInputField";
import orders from "../../../../store/actions/orders";
import {LocalizationProvider, MobileDateRangePicker} from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

const initialValues = {
    clockTypeId: '',
    cityId: undefined,
    isCompleted: '',
    dateRange: [null, null],
    priceRange: [0, 60]
};

const MasterOrdersFiltrationForm = () => {
    const classes = useStyles();
    const {t} = useTranslation();
    const [values, setValues] = useState(initialValues);
    const allClockTypes = useSelector(getClockTypesSelector).map(clockType => ({
        key: clockType.id,
        value: t(`clockTypes.${clockType.name}`)
    }));
    const allCities = useSelector(getCitiesSelector);
    // const allUsers = useSelector(getUsersSelector);
    const dispatch = useDispatch();

    const statuses = [
        {key: true, value: t("statusCompleted.true")},
        {key: false, value: t("statusCompleted.false")}
    ];

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                // ...((formValues.id.length > 0) && {id: toNumber(formValues.id)}),
                // ...(values.userId && {userId: values.userId}),
                ...(formValues.clockTypeId && {clockTypeId: formValues.clockTypeId}),
                // ...(values.masterId && {masterId: values.masterId}),
                ...(values.cityId && {cityId: values.cityId}),
                ...(typeof formValues.isCompleted === "boolean" && {isCompleted: formValues.isCompleted}),
            },
            ...(((values.dateRange[0] !== null) || (values.dateRange[1] !== null))
                && {dateRange: values.dateRange}),
            priceRange: values.priceRange
        };
        dispatch(orders.getCurrentMasterOrders(filters));
    }

    const onClear = () => {
        setValues(initialValues);
    }

    return (<Box className={classes.filtrationForm}>
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
        >{(props) => (
            <Form id='order-filter'>
                {/*<FormikTextField*/}
                {/*    name='id'*/}
                {/*    label='ID'*/}
                {/*    className={classes.filtrationFormItem}*/}
                {/*/>*/}
                {/*<AutocompleteField*/}
                {/*    label={t("forms.labels.email")}*/}
                {/*    options={allUsers}*/}
                {/*    optionValueKey={'email'}*/}
                {/*    handleValueChange={(v) => {*/}
                {/*        setValues({...values, userId: v})*/}
                {/*    }}*/}
                {/*    neededValueKey={'id'}*/}
                {/*    className={classes.filtrationFormItem}*/}
                {/*/>*/}
                <FormikSelectField
                    label={t("forms.labels.clockType")}
                    name='clockTypeId'
                    options={allClockTypes}
                />
                {/*<AutocompleteField*/}
                {/*    label={t("forms.labels.master")}*/}
                {/*    options={allMasters}*/}
                {/*    optionValueKey={'name'}*/}
                {/*    handleValueChange={(v) => {*/}
                {/*        setValues({...values, masterId: v});*/}
                {/*    }}*/}
                {/*    neededValueKey={'id'}*/}
                {/*    className={classes.filtrationFormItem}*/}
                {/*/>*/}
                <AutocompleteField
                    label={t("forms.labels.city")}
                    options={allCities}
                    optionValueKey={'name'}
                    handleValueChange={(v) => {
                        setValues({...values, cityId: v})
                    }}
                    neededValueKey={'id'}
                    className={classes.filtrationFormItem}
                />
                <FormikSelectField
                    label={t("forms.labels.status")}
                    name={'isCompleted'}
                    options={statuses}
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
                <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    localeText={{start: 'Mobile start', end: 'Mobile end'}}
                >
                    <MobileDateRangePicker
                        value={values.dateRange}
                        onChange={(v) => {
                            setValues({...values, dateRange: v});
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{mx: 2}}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </Form>
        )}</Formik>
        <Button type='submit' form='order-filter'>Confirm</Button>
        {/*<Button onClick={onClear}>Clear</Button>*/}
    </Box>)
};

export default MasterOrdersFiltrationForm;