import {Box, Button} from "@mui/material";
import {Form, Formik} from "formik";
import * as React from "react";
import {useState} from "react";
import {toNumber} from "lodash";
import useStyles from "../../../../styles/useStyles";
import AutocompleteField from "../../FormsComponents/AutocompleteField";
import RangeInput from "../../FormsComponents/RangeInputField";
import FormikTextField from "../../FormsComponents/FormikTextField";
import {useTranslation} from "react-i18next";
import {getAllCities} from "../../../../store/getters/cities";

const initialValues = {
    id: '',
    name: '',
    priceRange: [0, 20]
};

const CitiesFiltrationForm = ({filtrate}) => {
    const {t} = useTranslation();
    const classes = useStyles();

    const [values, setValues] = useState(initialValues);

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...((formValues.id.length > 0) && {id: toNumber(formValues.id)}),
                ...((values.name.length > 0) && {name: values.name}),
            },
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
            <Form id='city-filter'>
                <FormikTextField
                    name='id'
                    label='ID'
                    className={classes.filtrationFormItem}
                />
                <AutocompleteField
                    getOptionsFunction={getAllCities}
                    label={t("forms.labels.city")}
                    optionValueKey={'name'}
                    handleValueChange={(v) => {
                        setValues({...values, name: v})
                    }}
                    neededValueKey={'name'}
                    className={classes.filtrationFormItem}
                />
                <RangeInput
                    label={t("forms.labels.price")}
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
        <Button type='submit' form='city-filter'>{t("forms.buttons.confirm")}</Button>
    </Box>)
};

export default CitiesFiltrationForm;