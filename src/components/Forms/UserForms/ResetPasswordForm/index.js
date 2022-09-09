import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import useStyles from "../../../../styles/useStyles";
import FormikPasswordField from "../../FormsComponents/FormikPasswordField";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {getCurrentUserSelector} from "../../../../store/selectors/authSelector";
import {updateCredentials} from "../../../../store/actions/auth";
import {Alert, AlertTitle} from "@mui/material";

const initialValues = {
    password: '',
    confirmPassword: ''
}

const ResetPasswordForm = () => {
    const dispatch = useDispatch();
    const styles = useStyles();
    const currentUser = useSelector(getCurrentUserSelector);

    const [Error, setError] = useState(<></>);

    const onSubmit = async ({password}) => {
        const {error, payload} = await dispatch(updateCredentials({password}));
        if (error) {
            setError(
                <Alert severity="error" key={payload.message}>
                    <AlertTitle>Error</AlertTitle>
                    {payload.message}
                </Alert>
            );
        } else {
            setError(<></>);
        }
    };

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(8, 'Password is too short').required('Required'),
        confirmPassword: Yup.string().min(8, 'Password is too short').required('Required')
            .oneOf([Yup.ref('password'), null], 'Passwords dont match')
    });

    return (
        <>
            <Formik initialValues={initialValues} validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form id='reset-password-form'>
                            <FormikPasswordField
                                label='Password'
                                name='password'
                                error={props.errors.password && props.touched.password}
                                required
                            />
                            <FormikPasswordField
                                label='Confirm password'
                                name='confirmPassword'
                                error={props.errors.confirmPassword && props.touched.confirmPassword}
                                required
                            />
                        </Form>
                    )
                }
            </Formik>
            {Error}
        </>
    )
};

export default ResetPasswordForm;