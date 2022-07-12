import {Alert, AlertTitle} from '@mui/material';
import {useSelector} from "react-redux";
import {getErrorsSelector} from "../../../store/selectors/errorsSelector";

const ErrorListener = ({objType}) => {
    const errors = useSelector(getErrorsSelector);
    return (
        <>
            {errors[objType]?.map(error =>
                <Alert severity="error" key={error.message}>
                    <AlertTitle>Error</AlertTitle>
                    {error.message}
                </Alert>
            )}
        </>
    )
}

export default ErrorListener;