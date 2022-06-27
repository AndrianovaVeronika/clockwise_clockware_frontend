import {ErrorMessage, Field, Form, Formik} from "formik";
import {TextField} from "@mui/material";
import React from "react";
import useStyles from "../../../styles/useStyles";
import * as Yup from "yup";
import {useSelector} from "react-redux";
import {getOrderUserSelector} from "../../../store/selectors/authSelector";

const LoginOrSignup = ({formId, onSubmit}) => {
    const orderUser = useSelector(getOrderUserSelector);
    const classes = useStyles();

    const initialValues = {
        username: orderUser.username || '',
        email: orderUser.email || '',
        password: orderUser.password || ''
    };
    const validationSchema = Yup.object().shape({
        username: Yup.string().min(3, 'Username is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
    });

    return (
        <Formik initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
            {
                (props) => (
                    <Form id={formId}>
                        <Field as={TextField}
                               label='Username'
                               name='username'
                               className={classes.formItem}
                               error={props.errors.username && props.touched.username}
                               helperText={<ErrorMessage name='username'/>}
                               fullWidth
                               required
                        />
                        <Field as={TextField}
                               label='Email'
                               name='email'
                               className={classes.formItem}
                               error={props.errors.email && props.touched.email}
                               helperText={<ErrorMessage name='email'/>}
                               fullWidth
                               required
                        />
                    </Form>
                )
            }
        </Formik>
    )
}

export default LoginOrSignup;