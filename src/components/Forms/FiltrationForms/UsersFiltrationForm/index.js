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
// import {getAllUsers} from "../../../../store/getters/users";

const initialValues = {
    id: '',
    name: '',
    email: undefined,
    emailChecked: undefined,
    isPasswordTemporary: undefined
};

const UsersFiltrationForm = ({filtrate}) => {
    const classes = useStyles();
    const {t} = useTranslation();

    const [values, setValues] = useState(initialValues);

    const onSubmit = (formValues) => {
        const filters = {
            where: {
                ...((formValues.id.length > 0) && {id: _.toNumber(formValues.id)}),
                ...((formValues.name.length > 0) && {name: formValues.name}),
                ...(values.email && {email: values.email}),
                ...(values.emailChecked && {emailChecked: values.emailChecked}),
                ...(values.isPasswordTemporary && {isPasswordTemporary: values.isPasswordTemporary}),
            },
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
                />
                <YesNoChooseField
                    label={t("forms.labels.isPasswordTemporary")}
                    name={'isPasswordTemporary'}
                    value={values.isPasswordTemporary}
                    handleChange={(v) => {
                        setValues({...values, isPasswordTemporary: v})
                    }}
                />
            </Form>
        )}</Formik>
        <Button type='submit' form='order-filter'>Confirm</Button>
    </Box>)
};

export default UsersFiltrationForm;