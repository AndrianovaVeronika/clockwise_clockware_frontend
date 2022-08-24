import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import * as Yup from "yup";
import {Alert, AlertTitle} from "@mui/material";
import {Form, Formik} from "formik";
import React from "react";
import FormikTextField from "../../FormsComponents/FormikTextField";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";
import {registerUserAccount} from "../../../../store/actions/auth";

const initialValues = {
    name: "",
    email: "",
    password: ""
};

const UserSignUpForm = ({setError}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, 'Name is too short').required('Required'),
        email: Yup.string().email('Email is not valid').required('Required'),
        password: Yup.string().min(8, 'Password is too short').required('Required'),
    });

    const onSubmit = async (values, props) => {
        const {error, payload} = await dispatch(registerUserAccount(values));
        setError(
            <Alert severity="error" key={payload.message}>
                <AlertTitle>Error</AlertTitle>
                {payload.message}
            </Alert>
        );
        if (!error) {
            setError(<></>);
            navigate('/user/success');
        }
    };

    return (
        <>
            <Formik initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form id='signup-form'>
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
                            <FormikPasswordField
                                label='Password'
                                name='password'
                                error={props.errors.password && props.touched.password}
                                required
                            />
                        </Form>
                    )
                }
            </Formik>
        </>
    )
}

export default UserSignUpForm;