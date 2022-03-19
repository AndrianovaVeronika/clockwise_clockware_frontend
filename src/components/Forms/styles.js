import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
    formPaper: {
        padding: '10px 10px',
        width: '90%',
        margin: '10px auto'
    },
    authFormPaper: {
        display: 'flex',
        maxHeight: '400px',
        maxWidth: '400px',
        minHeight: '100px',
        minWidth: '200px',
        padding: '30px',
        flexDirection: 'column',
    },
    authFormButtons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    formItem: {
        margin: '5px'
    }
});

export default useStyles;