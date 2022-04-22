import {makeStyles} from "@mui/styles";
import {Field} from "formik";

export const useStyles = makeStyles({
    formPaper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        maxWidth: '500px'
    },
    authFormButtons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

export const FormField = (props) => (
    <Field sx={{margin: '5px'}} {...props}/>
);