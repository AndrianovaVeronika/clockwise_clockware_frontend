import {Box, Button} from "@mui/material";
import {Form, Formik} from "formik";
import * as React from "react";
import {useState} from "react";
import _ from "lodash";
import useStyles from "../../../../styles/useStyles";
import AutocompleteField from "../../FormsComponents/AutocompleteField";
import FormikTextField from "../../FormsComponents/FormikTextField";
import {useTranslation} from "react-i18next";
import YesNoChooseField from "../../FormsComponents/YesNoChooseField";
import {getAllUsers} from "../../../../store/getters/users";

const initialValues = {
    id: '',
    name: '',
    email: null,
    emailChecked: undefined,
    isPasswordTemporary: undefined
};

const UsersFiltrationForm = ({setFilters}) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [values, setValues] = useState(initialValues);

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...((formValues.id.length > 0) && {id: _.toNumber(formValues.id)}),
                ...((formValues.name.length > 0) && {name: formValues.name}),
                ...(values.email && {email: values.email.email}),
                ...(values.emailChecked && {emailChecked: values.emailChecked}),
                ...(values.isPasswordTemporary && {isPasswordTemporary: values.isPasswordTemporary}),
            },
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
            <Form id='user-filter' className={classes.filter}>
                <FormikTextField
                    name='id'
                    label='ID'
                    className={classes.filtrationFormItem}
                />
                <FormikTextField
                    label={t("forms.labels.name")}
                    name='name'
                    className={classes.filtrationFormItem}
                />
                <AutocompleteField
                    value={values.email}
                    getOptionsFunction={getAllUsers}
                    label={t("forms.labels.email")}
                    optionValueKey={'email'}
                    handleValueChange={(v) => {
                        setValues({...values, email: v})
                    }}
                    neededValueKey={'email'}
                    className={classes.filtrationFormItem}
                />
                <YesNoChooseField
                    label={t("forms.labels.emailChecked")}
                    name={'emailChecked'}
                    value={values.emailChecked}
                    handleChange={(v) => {
                        setValues({...values, emailChecked: v})
                    }}
                    className={classes.filtrationFormItem}
                />
                <YesNoChooseField
                    label={t("forms.labels.isPasswordTemporary")}
                    name={'isPasswordTemporary'}
                    value={values.isPasswordTemporary}
                    handleChange={(v) => {
                        setValues({...values, isPasswordTemporary: v})
                    }}
                    className={classes.filtrationFormItem}
                />
            </Form>
            <Button type='submit' form='user-filter'>Confirm</Button>
            <Button onClick={() => {
                onClear();
                props.handleReset();
            }}>{t("forms.buttons.clear")}</Button>
        </>)}</Formik>
    </Box>)
};

export default UsersFiltrationForm;