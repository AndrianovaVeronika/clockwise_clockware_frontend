import {Box, Button} from "@mui/material";
import {Form, Formik} from "formik";
import * as React from "react";
import {useState} from "react";
import {toNumber} from "lodash";
import useStyles from "../../../../styles/useStyles";
import AutocompleteField from "../../FormsComponents/AutocompleteField";
import RangeInput from "../../FormsComponents/RangeInputField";
import FormikTextField from "../../FormsComponents/FormikTextField";
import cities from "../../../../store/actions/cities";
import {useDispatch, useSelector} from "react-redux";
import {getCitiesSelector} from "../../../../store/selectors/citiesSelector";
import {useTranslation} from "react-i18next";

const initialValues = {
    id: '',
    name: '',
    priceRange: [0, 20]
};

const CitiesFiltrationForm = () => {
    const {t} = useTranslation();
    const classes = useStyles();
    const [values, setValues] = useState(initialValues);
    const allCities = useSelector(getCitiesSelector);
    const dispatch = useDispatch();

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...((formValues.id.length > 0) && {id: toNumber(formValues.id)}),
                ...((values.name.length > 0) && {name: values.name}),
            },
            priceRange: values.priceRange
        };
        dispatch(cities.getFiltered(filters));
    }

    return (<Box className={classes.filtrationForm}>
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
        >{(props) => (
            <Form id='city-filter'>
                <FormikTextField
                    name='id'
                    label='ID'
                    className={classes.filtrationFormItem}
                />
                <AutocompleteField
                    label={t("forms.labels.city")}
                    options={allCities}
                    optionValueKey={'name'}
                    handleValueChange={(v) => {
                        setValues({...values, name: v})
                    }}
                    neededValueKey={'name'}
                    className={classes.filtrationFormItem}
                />
                <RangeInput
                    label={'Price'}
                    from={0}
                    to={20}
                    step={0.1}
                    value={values.priceRange}
                    handleValueChange={(v) => {
                        setValues({...values, priceRange: v})
                    }}
                    className={classes.filtrationFormItem}
                />
            </Form>
        )}</Formik>
        <Button type='submit' form='city-filter'>Confirm</Button>
    </Box>)
};

export default CitiesFiltrationForm;