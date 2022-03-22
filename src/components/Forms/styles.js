import {makeStyles} from "@mui/styles";
import {Field} from "formik";

export const useStyles = makeStyles({
    formPaper: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        minHeight: '150px',
        minWidth: '250px',
        padding: '30px',
    },
    authFormButtons: {
        display: 'flex',
        justifyContent: 'flex-end'
    }
});

export const FormField = (props) => (
    <Field sx={{margin: '5px'}} {...props}/>
);