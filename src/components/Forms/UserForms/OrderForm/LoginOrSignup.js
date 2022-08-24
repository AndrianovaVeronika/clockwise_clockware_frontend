import {ErrorMessage, Form, Formik} from "formik";
import React from "react";
import useStyles from "../../../../styles/useStyles";
import * as Yup from "yup";
import FormikTextField from "../../FormsComponents/FormikTextField";

const LoginOrSignup = ({formId, onSubmit, values, currentUser}) => {
    const classes = useStyles();

    const initialValues = {
        name: values?.name || currentUser.name || '',
        email: values?.email || currentUser.email || ''
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required')
    });

    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
            {
                (props) => (
                    <Form id={formId}>
                        <FormikTextField
                            label='Name'
                            name='name'
                            error={props.errors.name && props.touched.name}
                            required
                        />
                        <FormikTextField
                            label='Email'
                            name='email'
                            error={props.errors.email && props.touched.email}
                            required
                        />
                    </Form>
                )
            }
        </Formik>
    )
}

export default LoginOrSignup;