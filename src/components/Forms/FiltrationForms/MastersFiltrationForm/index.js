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
import {getAllMasters} from "../../../../store/getters/masters";

const initialValues = {
    id: '',
    name: '',
    ratingRange: [0, 5]
};

const MastersFiltrationForm = ({filtrate}) => {
    const {t} = useTranslation();
    const classes = useStyles();

    const [values, setValues] = useState(initialValues);

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...((formValues.id.length > 0) && {id: toNumber(formValues.id)}),
                ...((values.name.length > 0) && {name: values.name}),
            },
            ratingRange: values.ratingRange
        };
        filtrate(filters);
    }

    return (<Box className={classes.filtrationForm}>
        <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={onSubmit}
        >{(props) => (
            <Form id='master-filter'>
                <FormikTextField
                    name='id'
                    label='ID'
                    className={classes.filtrationFormItem}
                />
                <AutocompleteField
                    getOptionsFunction={getAllMasters}
                    label={t("forms.labels.name")}
                    optionValueKey={'name'}
                    handleValueChange={(v) => {
                        setValues({...values, name: v})
                    }}
                    neededValueKey={'name'}
                    className={classes.filtrationFormItem}
                />
                <RangeInput
                    label={t("forms.labels.rating")}
                    from={initialValues.ratingRange[0]}
                    to={initialValues.ratingRange[1]}
                    step={1}
                    value={values.ratingRange}
                    handleValueChange={(v) => {
                        setValues({...values, ratingRange: v})
                    }}
                    className={classes.filtrationFormItem}
                />
            </Form>
        )}</Formik>
        <Button type='submit' form='master-filter'>{t("forms.buttons.confirm")}</Button>
    </Box>)
};

export default MastersFiltrationForm;